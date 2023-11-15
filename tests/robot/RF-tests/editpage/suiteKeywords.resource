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

Open Link Info To Be Edited
    [Documentation]    Opens the links info that is edited.
    [Arguments]    ${link_index}
    Click Element    xpath=//*[@id="root"]/div[2]/div/div[${link_index}]/div[1]

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
    Log To Console    ${description_length}
    FOR    ${index_d}    IN RANGE    0    ${description_length}
        Press Keys    id=description-${link_index}    BACKSPACE
        IF    ${index_d} == ${description_length}    BREAK
    END
    Input Text    id=description-${link_index}    ${new_description}

# Edit Link URL
#     [Documentation]    Removes old link url and inputs new url.
#     [Arguments]    ${link_index}    ${new_url}
#     ${url}=    Get Element Attribute    locator=id:url-${link_index}    attribute=value
#     ${url_length}=    Get Length    ${url}
#     FOR    ${index_u}    IN RANGE    0    ${url_length}
#         Press Keys    id=url-${link_index}    BACKSPACE
#     END
#     Input Text    id=url-${link_index}    ${new_url}

Send Edited Link
    [Documentation]    Saves the edited link.
    Click Button    Tallenna
    Sleep    1

Check Link Was Updated Successfully
    [Documentation]    Checks that correct alert occurs if link is saved successfully.
    Page Should Contain    Tiedot tallennettu onnistuneesti
    Click Button    OK

Check Link Was Updated Unsuccessfully
    [Documentation]    Checks that correct alert occurs if link is not saved.
    Page Should Contain    Tietojen tallennus epäonnistui
    Click Button    OK
