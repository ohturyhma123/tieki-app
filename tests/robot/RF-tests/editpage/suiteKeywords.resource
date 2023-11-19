*** Settings ***
Documentation    This file contains common keywords and variables used with test suites.

Library    SeleniumLibrary

*** Keywords ***
Check Edit Links Is Visible
    [Documentation]    Checks that the edit links button is visible.
    Page Should Contain    Muokkaa linkkejä

Check Edit Statements Is Visible
    [Documentation]    Checks that the edit links button is visible.
    Page Should Contain    Muokkaa väittämiä

Check Edit Results Is Visible
    [Documentation]    Checks that the edit links button is visible.
    Page Should Contain    Muokkaa analyyseja

Check Log Out Is Visible
    [Documentation]    Checks that the edit links button is visible.
    Page Should Contain    Kirjaudu ulos

Go To Edit Link Page
    [Documentation]    Clicks the button that takes the user to edit links page.
    Click Button    Muokkaa linkkejä
    Page Should Contain    Muokkaa linkkejä
    Page Should Contain    Tallenna

Go To Edit Statements Page
    [Documentation]    Clicks the button that takes the user to edit statements page.
    Click Button    Muokkaa väittämiä
    Page Should Contain    Positiiviset väittämät
    Page Should Contain    Negatiiviset väittämät

Go To Edit Analysis Page
    [Documentation]    Clicks the button that takes the user to edit analyses page.
    Click Button    Muokkaa analyyseja
    Page Should Contain    Muokkaa analyyseja
    Page Should Contain    Positiiviset analyysit
    Page Should Contain    Negatiiviset analyysit

Open Link Info
    [Documentation]    Opens the links info that is edited.
    [Arguments]    ${link_index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${link_index}]/div[1]

Open Statement Category Info
    [Documentation]    Opens the statement category info that is edited.
    [Arguments]    ${category_index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${category_index}]/div/div[1]

Open Analysis Category Info
    [Documentation]    Opens the analyses info that is edited.
    [Arguments]    ${analysis_index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${analysis_index}]/div/div[1]/div[1]

Edit Analysis Link
    # robocop: disable=0508,0503
    [Documentation]    Edits analysis text segment.
    [Arguments]    ${analysis_index}    ${new_link_name}    ${new_url}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[1]

    ${link_name}=    Get Element Attribute    locator=xpath:/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/input   attribute=value
    ${link_name_length}=    Get Length    ${link_name}
    FOR    ${index_n}    IN RANGE    0    ${link_name_length}
        Press Keys    xpath=/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/input    BACKSPACE
        IF    ${index_n} == ${link_name_length}    BREAK
    END
    Input Text    xpath=/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[1]/div/input    ${new_link_name}

    ${link_url}=    Get Element Attribute    locator=xpath:/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[2]/div/input   attribute=value
    ${link_url_length}=    Get Length    ${link_url}
    FOR    ${index_n}    IN RANGE    0    ${link_url_length}
        Press Keys    xpath=/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[2]/div/input    BACKSPACE
        IF    ${index_n} == ${link_url_length}    BREAK
    END
    Input Text    xpath=/html/body/div/div[2]/div/div[${analysis_index}]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div/div[2]/div/input    ${new_url}
    # robocop: disable=0508,0503

Edit Statement
    [Documentation]    Removes old statement and inputs new statement.
    [Arguments]    ${statement_id}    ${new_statement}
    ${statement}=    Get Element Attribute    locator=id:${statement_id}   attribute=value
    ${statement_length}=    Get Length    ${statement}
    FOR    ${index_n}    IN RANGE    0    ${statement_length}
        Press Keys    id=${statement_id}    BACKSPACE
        IF    ${index_n} == ${statement_length}    BREAK
    END
    Input Text    id=${statement_id}    ${new_statement}

Edit Link Name
    [Documentation]    Removes old link name and inputs new name.
    [Arguments]    ${link_index}    ${new_name}
    ${name}=    Get Element Attribute    locator=id:name-${link_index}    attribute=value
    ${name_length}=    Get Length    ${name}
    FOR    ${index_n}    IN RANGE    0    ${name_length}
        Press Keys    id=name-${link_index}    BACKSPACE
        IF    ${index_n} == ${name_length}    BREAK
    END
    Input Text    id=name-${link_index}    ${new_name}

Edit Link Description
    [Documentation]    Removes old link name and inputs new name.
    [Arguments]    ${link_index}    ${new_description}
    ${description}=    Get Element Attribute    locator=id:description-${link_index}    attribute=value
    ${description_length}=    Get Length    ${description}
    FOR    ${index_d}    IN RANGE    0    ${description_length}
        Press Keys    id=description-${link_index}    BACKSPACE
        IF    ${index_d} == ${description_length}    BREAK
    END
    Input Text    id=description-${link_index}    ${new_description}

Send Edited Object
    [Documentation]    Saves the edited link.
    Click Button    Tallenna
    Sleep    3

Check Object Was Updated Successfully
    [Documentation]    Checks that correct alert occurs if link is saved successfully.
    Page Should Contain    Tiedot tallennettu onnistuneesti
    Click Button    OK
    Page Should Contain    Muokkaussivu

Check Object Was Updated Unsuccessfully
    [Documentation]    Checks that correct alert occurs if link is not saved.
    Page Should Contain    Tietojen tallennus epäonnistui
    Click Button    OK
    Page Should Contain    Tallenna

Set Link DB To Initial State
    [Documentation]    Sets the database to initial state.
    [Arguments]    ${link_index}    ${edited_part}    ${initial_value}
    Go To Edit Link Page
    Open Link Info   ${link_index}
    IF  $edited_part == 'name'
        Edit Link Name    ${link_index}    ${initial_value}
    ELSE IF    $edited_part == 'description'
        Edit Link Description    ${link_index}    ${initial_value}
    END
    Send Edited Object
    Check Object Was Updated Successfully

Set Statement DB To Initial State
    [Documentation]    Sets the database to initial state.
    [Arguments]    ${category_index}    ${statement_id}    ${initial_value}
    Go To Edit Statements Page
    Open Statement Category Info   ${category_index}
    Edit Statement    ${statement_id}    ${initial_value}
    Send Edited Object
    Check Object Was Updated Successfully

Set Analysis DB To Initial State
    [Documentation]    Sets the database to initial state.
    [Arguments]    ${analysis_index}    ${initial_link_name}    ${initial_link_url}
    Go To Edit Analysis Page
    Open Analysis Category Info  ${analysis_index}
    Edit Analysis Link    ${analysis_index}    ${initial_link_name}    ${initial_link_url}
    Send Edited Object
    Check Object Was Updated Successfully

Delete Link
    [Documentation]    Deletes the link.
    [Arguments]    ${link_index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[2]/div[${link_index}]/div/div/div/div/button
    Page Should Contain    Muokkaa linkkejä
