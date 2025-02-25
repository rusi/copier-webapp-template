#!/bin/bash
# ref: https://gist.github.com/ryangatchalian912/75c6894c3f3143fef366d25eb63437ab

(( ${#} >= 0 )) || {
  echo 'DISCLAIMER: USE THIS SCRIPT AT YOUR OWN RISK!'
  echo 'THE AUTHOR TAKES NO RESPONSIBILITY FOR THE RESULTS OF THIS SCRIPT.'
  echo "Disclaimer aside, this worked for the author, for what that's worth."
  echo 'Press Control-C to quit now.'
  read
  echo 'Re-running the script with sudo.'
  echo 'You may be prompted for a password.'

  sudo ${0} sudo
  exit $?
}
# This will need to be executed as an Admin (maybe just use sudo).

# Verify that Node.js bom exists. Otherwise, don't do anything.
[ -e /var/db/receipts/org.nodejs.node.pkg.bom ] || {
  echo '>>> Node.js not found. Nothing to do.'
  exit 0
}

# Verify that the npm bom exists. Otherwise, don't do anything.
[ -e /var/db/receipts/org.nodejs.npm.pkg.bom ] || {
  echo '>>> npm not found. Nothing to do.'
  exit 0
}

for bom in org.nodejs.node.pkg.bom org.nodejs.npm.pkg.bom; do
  receipt=/var/db/receipts/${bom}

  echo ">>> Removing bom files from ${bom}..."

  [ -e ${receipt} ] && {
    # Loop through all the files in the bom.
    lsbom -f -l -s -pf ${receipt} \
    | while read i; do
      # Remove each file listed in the bom.
      rm -v /usr/local/${i#./usr/local/}
    done
  }
done

# Remove files and directories related to Node.js and npm.
echo '>>> Removing Node.js and npm files and directories...'
sudo rm -rfv /usr/local/lib/node_modules \
  /usr/local/lib/node \
  /usr/local/include/node \
  /usr/local/share/doc/node \
  /usr/local/share/man/{man1,man5}/npm* \
  /usr/local/share/man/{man1,man5}/npx* \
  /usr/local/share/man/{man1,man5}/install* \
  /usr/local/share/man/{man1,man5}/folders* \
  /usr/local/share/man/{man1,man5}/package-json* \
  /usr/local/share/man/{man1,man5}/package-lock* \
  /usr/local/share/man/{man1,man5}/shrinkwrap* \
  /usr/local/share/man/man7 \
  /usr/local/bin/{npx,npm,node} \
  /var/db/receipts/org.nodejs.* \
  ~/.node-gyp \
  ~/.npm

exit 0
