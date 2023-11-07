*** Settings ***
Documentation    This test suite contains tests for links API.

Resource    ../../RF-keywords/CommonFunctions.resource
Resource    suiteKeywords.resource

Suite Setup    Initialize Session

Test Tags    API    linksAPI


*** Test Cases ***
Get All Links
    [Documentation]    Sends a GET request to links api and checks 13 links are
    ...                returned in json format.
    ${response}=    Send Get Request    linksApi
    Check Response Status Is Correct    ${response.status_code}    200
    Check Correct Amount Of List Items Is Returned    ${response.json()}    13

Get First Link
    [Documentation]    Fetches the first link that is used for this test suite.
    ${ALL_LINKS}=    Send Get Request    linksApi
    Set Suite Variable    ${ALL_LINKS}
    ${FIRST_LINK}=    Get Item Of Json By Index    ${ALL_LINKS.json()}    0
    Set Suite Variable    ${FIRST_LINK}
    ${FIRST_LINK_NAME}=    Set Variable    ${FIRST_LINK['name']}
    Set Suite Variable    ${FIRST_LINK_NAME}

Link Can Be Modified
    [Documentation]    Checks that a link can be modified.
    ${first_link_copy}=    Copy Dictionary    ${FIRST_LINK}
    ${all_links_copy}=    Copy List    ${ALL_LINKS.json()}
    ${new_json}=    Modify Json    ${first_link_copy}    name    test
    Set Updated Item To List    ${new_json}    ${all_links_copy}    0
    ${response}=    Send Put Request    linksApi    ${all_links_copy}
    Check Response Status Is Correct    ${response.status_code}    200

    ${updated_links}=    Send Get Request    linksApi
    Check Object Was Updated    ${updated_links.json()[0]['name']}    test
    Convert List To Initial State    ${ALL_LINKS.json()}    ${FIRST_LINK}    0
    ...                              name    ${FIRST_LINK_NAME}    linksApi


*** Keywords ***
Initialize Session
    [Documentation]    Creates API session for tests.
    Create Session    linksApi    ${LINKSAPI}
