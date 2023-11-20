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

Check Link Was Added Successfully
    [Documentation]    Checks that a link was added successfully.
    Go To Edit Link Page
    ${count_before}=    Get Element Count    id=linkComponent
    Add Link    Test Link    Test Description    http://test.com
    ${COUNTAFTER}=    Get Element Count    id=linkComponent
    Should Be True    ${COUNTAFTER} == ${count_before} + 1
    Set Suite Variable    ${COUNTAFTER}

Edit Link Successfully
    [Documentation]    Checks that an user can edit a links name.
    Go To Edit Link Page
    Open Link Info   ${COUNTAFTER}
    Edit Link Name    ${COUNTAFTER}    Testilinkin nimimuutos
    Send Edited Link
    Check Link Was Updated Successfully

Edit Link Unsuccessfully
    [Documentation]    Checks that an user can't input empty link description.
    Go To Edit Link Page
    Open Link Info    ${COUNTAFTER}
    Edit Link Description    ${COUNTAFTER}    new_description=
    Send Edited Link
    Check Link Was Updated Unsuccessfully

Delete Link Successfully
    [Documentation]    Checks that an user can delete a link.
    Go To Edit Link Page
    Open Link Info    ${COUNTAFTER}
    Sleep    3s
    Delete Link    ${COUNTAFTER}
    Sleep    3s
