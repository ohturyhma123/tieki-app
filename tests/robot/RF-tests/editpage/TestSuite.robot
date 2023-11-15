*** Settings ***
Documentation    Tests for editing functionalities.

Resource    ../../RF-keywords/CommonFunctions.resource
Resource  suiteKeywords.resource

Suite Setup
...        Run Keywords
...        Open And Configure Browser
...        AND    Register Keyword To Run On Failure    Nothing
Suite Teardown    Close Browser

Test Setup    Go To Editpage
Test Tags    edit


*** Test Cases ***
Edit Page Is Open
    [Documentation]    Checks that the edit page is open correctly and correct
    ...                elements are visible.
    Check Edit Links Is Visible
    Check Edit Statements Is Visible
    Check Edit Results Is Visible
    Check Log Out Is Visible

Edit Link Successfully
    [Documentation]    Checks that an user can edit a links name.
    Go To Edit Link Page
    Open Link Info To Be Edited    1
    Edit Link Name    1    Testinimi
    Send Edited Link
    Check Link Was Updated Successfully

Edit Link Unsuccessfully
    [Documentation]    Checks that an user can't input empty link description.
    Go To Edit Link Page
    Open Link Info To Be Edited    2
    Edit Link Description    2    new_description=
    Send Edited Link
    Check Link Was Updated Unsuccessfully
