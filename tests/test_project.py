from pathlib import Path

import pytest


@pytest.fixture(scope="session")
def copier_project_defaults():
    return {
        "app_name": "test_app",
        "version": "0.1.0",
        "full_name": "Jane Smith",
        "copyright_holder": "Jane Smith",
        "app_short_description": "test app short description",
        "github_organization": "rusi",
        "email": "jsmith@example.com",
    }


def check_template_resolved(project_file: Path, expected_lines: list[str]):
    assert project_file.exists()
    content = project_file.read_text()
    for line in expected_lines:
        assert line in content, f"{project_file} should contain '{line}'"


def test_project_folder(copie, copier_project_defaults):
    project_defaults = copier_project_defaults
    project = copie.copy(extra_answers=project_defaults)

    assert project.exit_code == 0
    assert project.exception is None
    assert project.project_dir.is_dir()

    assert (project.project_dir / ".vscode" / "test_app.code-snippets").exists()

    check_template_resolved(
        project.project_dir / "README.md",
        ["# test_app", "test app short description"],
    )
    check_template_resolved(
        project.project_dir / "pyproject.toml",
        [
            'name = "test_app"',
            'description = "test app short description"',
            'version = "0.1.0"',
            'authors = ["Jane Smith <jsmith@example.com>"]',
        ],
    )
    check_template_resolved(
        project.project_dir / ".vscode" / "test_app.code-snippets",
        [
            "// Place your test_app workspace snippet",
            "Copyright (c) 2024 Jane Smith",
            "Insert test_app copyright block",
        ],
    )
    check_template_resolved(
        project.project_dir / ".vscode" / "launch.json",
        ['"name": "Python: test_app"'],
    )
