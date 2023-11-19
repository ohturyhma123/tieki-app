*** Settings ***
Documentation    Tests for editing functionalities.

Resource    ../../RF-keywords/CommonFunctions.resource
Resource  suiteKeywords.resource
Resource    ../API/suiteKeywords.resource

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
    Open Link Info   1
    Edit Link Name    1    Testinimi
    Send Edited Object
    Check Object Was Updated Successfully

    Set Link DB To Initial State    link_index=1    edited_part=name    initial_value=Kirjoittajan ABC

Edit Link Unsuccessfully
    [Documentation]    Checks that correct error message is shown when necessary.
    Go To Edit Link Page
    Open Link Info    2
    Edit Link Description    2    new_description=
    Send Edited Object
    Check Object Was Updated Unsuccessfully

Edit Statement Successfully
    # robocop: disable=0508
    [Documentation]    Checks that an user can edit a statement successfully.
    Go To Edit Statements Page
    Open Statement Category Info    2
    Edit Statement    6545515993b2b555b81aebc6    Testiväittämä
    Send Edited Object
    Check Object Was Updated Successfully

    Set Statement DB To Initial State    2    6545515993b2b555b81aebc6    Osaan kirjoittaa erilaisia oman alan tekstilajeja.
    # robocop: enable=0508

Edit Analysis Successfully
    [Documentation]    Checks that an user can edit an analysis successfully.
    Go To Edit Analysis Page
    Open Analysis Category Info    5
    Edit Analysis Link    5    Testinimi    testi.com
    Send Edited Object
    Check Object Was Updated Successfully

    Set Analysis DB To Initial State    analysis_index=5    initial_link_name=    initial_link_url=

# Delete Link Successfully
#     [Documentation]    Checks that an user can delete a link.
#     Go To Edit Link Page
#     Open Link Info    2
#     Sleep    3s
#     Delete Link    2
