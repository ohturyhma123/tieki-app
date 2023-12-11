*** Settings ***
Documentation    This test suite contains tests for links API.

Resource    ../../CommonKeywords/CommonFunctions.resource
Resource    suiteKeywords.resource

Suite Setup    Initialize Session

Test Tags    API    linksAPI


*** Test Cases ***
Get All Links
    [Documentation]    Sends a GET request to links api and checks that list is not empty.
    ${response}=    Send Get Request    linksApi
    Check Response Status Is Correct    ${response.status_code}    200
    Check Correct Amount Of List Items Is Returned    ${response.json()}

Get First Link
    [Documentation]    Fetches the first link that is used for this test suite.
    ${ALL_LINKS}=    Send Get Request    linksApi
    Set Suite Variable    ${ALL_LINKS}
    ${FIRST_LINK}=    Get Item Of Json By Index    ${ALL_LINKS.json()}    0
    Set Suite Variable    ${FIRST_LINK}
    ${FIRST_LINK_NAME}=    Set Variable    ${FIRST_LINK['name']}
    Set Suite Variable    ${FIRST_LINK_NAME}

Get Last Link
    [Documentation]    Fetches the first link that is used for this test suite.
    ${ALL_LINKS}=    Send Get Request    linksApi
    Set Suite Variable    ${ALL_LINKS}
    ${LAST_LINK}=    Get Item Of Json By Index    ${ALL_LINKS.json()}    -1
    Set Suite Variable    ${LAST_LINK}
    ${LAST_LINK_NAME}=    Set Variable    ${LAST_LINK['name']}
    ${LAST_LINK_DESC}=    Set Variable    ${LAST_LINK['description']}
    ${LAST_LINK_URL}=    Set Variable    ${LAST_LINK['url']}
    Set Suite Variable    ${LAST_LINK_NAME}
    Set Suite Variable    ${LAST_LINK_DESC}
    Set Suite Variable    ${LAST_LINK_URL}

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

Delete Link API Test
    [Documentation]    Checks that an user can delete a link via API.
    ${link_id}=    Get From Dictionary    ${LAST_LINK}    id
    ${response}=    Send Delete Request    linksApi    ${link_id}
    Check Response Status Is Correct    ${response.status_code}    200

Post Link API Test
    [Documentation]    Checks that an user can post a link via API.
    ${new_link}=    Create Dictionary    name=${LAST_LINK_NAME}    description=${LAST_LINK_DESC}    url=${LAST_LINK_URL}
    ${response}=    Send Post Request    linksApi    ${new_link}
    Check Response Status Is Correct    ${response.status_code}    200

    ${all_links}=    Send Get Request    linksApi
    ${last_linkki}=    Set Variable    ${all_links.json()[-1]['name']}
    Should Be Equal    ${last_linkki}    ${LAST_LINK_NAME}


*** Keywords ***
Initialize Session
    [Documentation]    Creates API session for tests.
    Create Session    linksApi    ${LINKSAPI}
