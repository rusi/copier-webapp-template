import pytest
from app.main import app
from fastapi.testclient import TestClient


@pytest.fixture
def test_client():
    return TestClient(app)
