from random import randint

from fastapi import APIRouter

router = APIRouter()


@router.get("/random")
def get_random_number() -> dict[str, int]:
    """Get a random number."""
    return {"number": randint(1, 100)}  # noqa: S311
