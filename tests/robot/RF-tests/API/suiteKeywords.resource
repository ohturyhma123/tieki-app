*** Settings ***
Documentation    Contains keywords used with API calls.


*** Keywords ***
Send Get Request
    [Documentation]    Sends a GET request for given session.
    [Arguments]    ${session}
    ${headers}=    Create Dictionary    accept=application/json
    ${response}=    GET On Session    ${session}    /    headers=${headers}
    RETURN    ${response}

Send Put Request
    [Documentation]    Sends a PUT request for given session with given body.
    [Arguments]    ${session}    ${body}
    ${headers}=    Create Dictionary    accept=application/json
    ${response}=    PUT On Session    ${session}    /    json=${body}    headers=${headers}
    RETURN    ${response}

Check Response Status Is Correct
    [Documentation]    Checks that a HTTP request has correct response status.
    [Arguments]    ${status_code}    ${expected_status_code}
    Should Be Equal As Integers    ${status_code}    ${expected_status_code}

Check Correct Amount Of List Items Is Returned
    [Documentation]    Checks that the json API response has correct amount of items.
    [Arguments]    ${response_json}    ${expected_amount}
    ${items}=    Get Length    ${response_json}
    Should Be Equal As Integers    ${items}    ${expected_amount}

Get Item Of Json By Index
    [Documentation]    Extracts the first item in json.
    [Arguments]    ${json}    ${index}
    ${first}=    Set Variable   ${json[${index}]}
    RETURN    ${first}

Modify Json
    [Documentation]    Modifies a JSON file to have desired values.
    [Arguments]    ${json}    ${key}    ${new_value}
    Set To Dictionary    ${json}    ${key}=${new_value}
    RETURN    ${json}

Set Updated Item To List
    [Documentation]    Sets the updated item to list.
    [Arguments]    ${updated_item}    ${list}    ${index}
    Convert To List    ${list}
    Set List Value    ${list}    ${index}    ${updated_item}
    RETURN    ${list}

Check Object Was Updated
    [Documentation]    Checks that a object was updated successfully.
    [Arguments]    ${updated_object}    ${updated_value}
    Should Be Equal    ${updated_object}    ${updated_value}

Convert List To Initial State
    # robocop: disable=0507
    [Documentation]    Converts the database back to initial state.
    [Arguments]    ${initial_objects}    ${initial_object}    ${initial_obj_index}    ${initial_value}
    ...            ${expected_value}    ${session}
    Set Updated Item To List    ${initial_object}    ${initial_objects}    ${initial_obj_index}
    ${response}=    Send Put Request    ${session}    ${initial_objects}
    Check Response Status Is Correct    ${response.status_code}    200
    Check Object Was Updated    ${initial_object['${initial_value}']}    ${expected_value}
    # robocop: enable=0507
