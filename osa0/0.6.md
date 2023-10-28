sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    browser-->>server: Request Payload
    deactivate server
    
    Note left of browser: New note is sent to server and loaded JS-file is called to render the new note on browser.