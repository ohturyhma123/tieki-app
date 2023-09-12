## How to do UI tests with Robot Framework and Selenium

1. Install Robot Framework
```bash
pip install robotframework
```

2. Install SeleniumLibrary for Robot Framework
```bash
pip install robotframework-seleniumlibrary
```
This also installs Selenium on your computer, but you have to downgrade selenium version to 4.9.1
```bash
pip install selenium==4.9.1
```

3. Install VSCodes Robot Framework Language Server extension.

4. Install Chrome and Chromedriver. Make sure that Chrome and Chromedriver you installed are the same version! [Install Chromedriver](https://ohjelmistotuotanto-hy.github.io/chromedriver_asennusohjeet/)

5. Follow structure shown [here](./examples/)
- All keywords used with Test Suite should be located in a .resource file, except for Suite and Test Set Up keywords.

6. You can find web elements from a browsers inspection view. I like to use chrome. ![Screenshot](./screenshots/Screenshot%20from%202023-09-12%2011-56-30.png)

7. Run the Test Suite by clicking 'Run Suite' button in the beginning of the test suite file. ![Screenshot](./screenshots/Screenshot%20from%202023-09-12%2012-05-49.png)
Or run a single test case clicking the green arrow button next to the Test Case.
You can also run the suite by robot command
```bash
robot -i 'Your Tag' .
```
In my example case, the command is
```bash
robot -i example .
```
because the suite's Test Tag is example.

8. Check out the log after executing the test suite. ![Screenshot](./screenshots/Screenshot%20from%202023-09-12%2012-12-58.png)
The log provides information of the execution of the test suite. If the test suite/case fails for some reason, the log has more detailed information of why it failed.
