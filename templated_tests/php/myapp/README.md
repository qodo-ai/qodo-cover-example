# MyApp - Example PHP Project with PHPUnit Coverage

This is a sample PHP application with multiple source files and a PHPUnit test suite that demonstrates code coverage analysis using Xdebug and PHPUnit.

## Prerequisites

- **PHP** (version 8.1 or later recommended)
- **Composer** (PHP dependency manager)
- **PHPUnit** (for unit testing)
- **Xdebug** (for code coverage)

## Installation

### macOS

1. **Install PHP** via [Homebrew](https://brew.sh/):

    ```bash
    brew install php
    ```

    Verify installation:

    ```bash
    php -v
    ```

2. **Install Composer**:

    ```bash
    brew install composer
    ```

    Verify installation:

    ```bash
    composer -V
    ```

3. **Install Xdebug** via PECL:

    ```bash
    pecl install xdebug
    ```

    Add `zend_extension="xdebug.so"` and `xdebug.mode=coverage` to your `php.ini`, then verify:

    ```bash
    php -m | grep xdebug
    ```

4. **Install Dependencies**:

    ```bash
    composer install
    ```

### Linux (Debian/Ubuntu)

1. **Install PHP**:

    ```bash
    sudo apt-get update
    sudo apt-get install php-cli php-xml php-mbstring unzip
    php -v
    ```

2. **Install Composer**:

    ```bash
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"
    sudo mv composer.phar /usr/local/bin/composer
    composer -V
    ```

3. **Install Xdebug**:

    ```bash
    sudo apt-get install php-xdebug
    ```

    Edit `php.ini` to include:

    ```ini
    zend_extension="xdebug.so"
    xdebug.mode=coverage
    ```

    Then verify:

    ```bash
    php -m | grep xdebug
    ```

4. **Install Dependencies**:

    ```bash
    composer install
    ```

### Windows

1. **Install PHP**:  
    Download from [windows.php.net](https://windows.php.net/download/) and follow the instructions. Add `php.exe` to your `PATH`.  
    Verify installation:

    ```bash
    php -v
    ```

2. **Install Composer**:  
    Download and run [Composer Setup](https://getcomposer.org/download/).  
    Verify:

    ```bash
    composer -V
    ```

3. **Install Xdebug**:
    Download the appropriate DLL from [xdebug.org](https://xdebug.org/download) and place it in your PHP `ext` directory. Update `php.ini`:

    ```ini
    zend_extension="xdebug"
    xdebug.mode=coverage
    ```

    Verify:

    ```bash
    php -m | findstr xdebug
    ```

4. **Install Dependencies**:

    ```bash
    composer install
    ```

## Running Tests and Generating Coverage

Ensure you have `XDEBUG_MODE=coverage` set (for macOS/Linux) or the equivalent `xdebug.mode=coverage` in `php.ini` for Windows.

**Run Tests and Generate Cobertura Coverage XML:**

```bash
XDEBUG_MODE=coverage vendor/bin/phpunit --coverage-cobertura coverage.xml --disable-coverage-ignore
```

**Generate HTML Coverage Report:**

```bash
XDEBUG_MODE=coverage vendor/bin/phpunit --coverage-html coverage
```

Open `coverage/index.html` in your browser to view detailed coverage information.

## Files and Directories

- `src/` - Source code (e.g., `Calculator.php` and `Math/AdvancedOperations.php`)
- `tests/` - PHPUnit test files
- `composer.json` - Composer configuration
- `phpunit.xml` - PHPUnit configuration

## Notes

- Make sure `composer install` is run before testing to install PHPUnit.
- Adjust PHP version and file paths as needed for your environment.
