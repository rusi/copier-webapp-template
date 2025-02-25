FROM python:3.10

RUN apt-get update && apt-get install -y --no-install-recommends \
    supervisor \
    build-essential \
    curl \
    nginx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir --upgrade "uvicorn[standard]==0.32.1" "uvloop==0.21.0"

# installs nvm (Node Version Manager)
SHELL ["/bin/bash", "--login", "-c"]
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=22.12.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
RUN nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION \
    && nvm alias default $NODE_VERSION

ENV NODE_PATH=$NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Set up backend
WORKDIR /app/backend
COPY backend/requirements.txt /app/backend/
RUN pip install --no-cache-dir --upgrade -r /app/backend/requirements.txt

# COPY backend/data/ /app/backend/data/
COPY backend/app/ /app/backend/app/

# Set up frontend
WORKDIR /app/frontend
COPY frontend/build/ /app/frontend/

# RUN rm /etc/nginx/sites-enabled/default
COPY build/nginx.conf /etc/nginx/nginx.conf

COPY build/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
