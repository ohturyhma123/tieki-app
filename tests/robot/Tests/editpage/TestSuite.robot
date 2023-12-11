*** Settings ***
Documentation    Tests for editing functionalities.

Resource    ../../CommonKeywords/CommonFunctions.resource
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
    Sleep    0.5
    ${count_before}=    Get Element Count    id=linkComponent
    Add Link    Test Link    Test Description    http://test.com
    Sleep    0.5
    ${COUNTAFTER}=    Get Element Count    id=linkComponent
    Should Be True    ${COUNTAFTER} == ${count_before} + 1
    Set Suite Variable    ${COUNTAFTER}

Edit Link Successfully
    [Documentation]    Checks that an user can edit a links name.
    Go To Edit Link Page
    Open Link Info   ${COUNTAFTER}
    Edit Link Name    ${COUNTAFTER}    Testilinkin nimimuutos
    Send Edited Object
    Check Object Was Updated Successfully

Edit Link Unsuccessfully
    [Documentation]    Checks that an user can't input empty link description.
    Go To Edit Link Page
    Open Link Info    ${COUNTAFTER}
    Edit Link Description    ${COUNTAFTER}    new_description=
    Send Edited Object
    Check Object Was Updated Unsuccessfully

Delete Link Successfully
    [Documentation]    Checks that an user can delete a link.
    Go To Edit Link Page
    Open Link Info    ${COUNTAFTER}
    Delete Link    ${COUNTAFTER}

Edit Statement Successfully
    # robocop: disable=0508
    [Documentation]    Checks that an user can edit a statement successfully.
    Go To Edit Statements Page
    Open Statement Category Info    1
    Edit Statement    1    Testiväittämä
    Send Edited Object
    Check Object Was Updated Successfully

    Set Statement DB To Initial State    1    1    Kirjoittaessani sosiaalinen tuki on avuksi.
    # robocop: enable=0508

Edit Analysis Successfully
    [Documentation]    Checks that an user can edit an analysis successfully.
    Go To Edit Analysis Page
    Open Analysis Category Info    5
    Edit Analysis Link    5    Testinimi    testi.com
    Send Edited Object
    Check Object Was Updated Successfully

    Set Analysis DB To Initial State    5    Lue tieteellisen tekstin rakenteesta ja argumentoinnista (luvut 4 ja 5) e-kirjasta Tiede ja teksti – Tehoa ja taitoa tutkielman kirjoittamiseen (lainattavissa Haka-tunnuksilla ja kirjastoista):    https://www.ellibslibrary.com/book/9789523455115

Add New Analysis Link Sucessfully
    [Documentation]    Checks that an user can add a new link to an analysis.
    Go To Edit Analysis Page
    Open Analysis Category Info    5
    Click Link Info    2
    ${count_before}=    Get Element Count    id=linkinkuvaus
    Add New Analysis Link    Testinimi    testi.com
    Sleep    2
    ${COUNTAFTER}=    Get Element Count    id=linkinkuvaus
    Should Be True    ${COUNTAFTER} == ${count_before} + 1

Delete Analysis Link Successfully
    [Documentation]    Checks that an user can delete a link from an analysis.
    Go To Edit Analysis Page
    Open Analysis Category Info    5
    Click Link Info    2
    ${count_before}=    Get Element Count    id=linkinkuvaus
    Delete Analysis Link
    Sleep    2
    ${COUNTAFTER}=    Get Element Count    id=linkinkuvaus
    Should Be True    ${COUNTAFTER} == ${count_before} - 1

Empty Link Description And URL Cannot Be Added
    # robocop: disable=0508
    [Documentation]    Checks that an error message is shown when the user tries to add a link with an empty description and URL.
    Go To Edit Analysis Page
    Open Analysis Category Info    5
    Click Link Info    2
    Add New Analysis Link    ${EMPTY}    ${EMPTY}
    Wait Until Page Contains    Tietojen tallennus epäonnistui
