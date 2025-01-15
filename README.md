# Qodo Cover GitHub Action Example

This repo shows how the [Qodo Cover GitHub Actions](https://github.com/qodo-ai/qodo-ci) can be added to your repository.

The repo linked above defines 2 actions:

- `qodo-cover`: This action runs the Qodo Cover agent and is intended to be manually triggered. The agent tries to expand coverage on all project files of the specified language.
- `qodo-cover-pr`: This action runs the Qodo Cover agent in "pr" mode, and is intended to be triggered by pull requests. In "pr" mode, the agent tries to expand coverage only on *modified files* of the specified language.

In both of the above actions if the agent successfully increases coverage it will create a PR with the added tests as well as a coverage improvement report. See [this PR](https://github.com/qodo-ai/qodo-ci-example/pull/19) as an example.

## Supported languages

- Python
- PHP
- Java
- Go
- Kotlin
- More coming soon!

## Workflow examples

To use a Qodo Cover GitHub Action, you need to add it to your GitHub workflow. Take a look at the following working examples:

- [`.github/workflows/qodo-cover-pr-python.yml`](.github/workflows/qodo-cover-pr-python.yml). This workflow triggers on pull requests and runs the agent in "pr" mode on the **Python** project in `templated_tests/python-fastapi`.
- [`.github/workflows/qodo-cover-python.yml`](.github/workflows/qodo-cover-python.yml). This workflow is triggered manually and runs the agent on the **Python** project in `templated_tests/python-fastapi`.
- [`.github/workflows/qodo-cover-java.yml`](.github/workflows/qodo-cover-java.yml). This workflow is triggered manually and runs the agent on the **Java** project in `templated_tests/java/JokeFunction`.
- [`.github/workflows/qodo-cover-php.yml`](.github/workflows/qodo-cover-php.yml). This workflow is triggered manually and runs the agent on the **PHP** project in `templated_tests/php/myapp`.
- [`.github/workflows/qodo-cover-go.yml`](.github/workflows/qodo-cover-go.yml). This workflow is triggered manually and runs the agent on the **Go** project in `templated_tests/go/taskmgr`.
- [`.github/workflows/qodo-cover-kotlin.yml`](.github/workflows/qodo-cover-kotlin.yml). This workflow is triggered manually and runs the agent on the **Kotlin** project in `templated_tests/kotlin/taskmgr`.

**Remember to enable GitHub Actions to create pull requests:** This setting can be found in a repository's settings under Actions > General > Workflow permissions.

## Generated Tests

While developing the Qodo Cover agent we tested it on some open source repositories. Take a look at the changes in these pull requests:

- [hugginface/pytorch-image-models](https://github.com/huggingface/pytorch-image-models/pull/2331)
- [facebook/prophet](https://github.com/facebook/prophet/pull/2640)
- [microsoft/onnxscript](https://github.com/microsoft/onnxscript/pull/1967)
