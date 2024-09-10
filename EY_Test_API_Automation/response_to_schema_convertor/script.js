// See https://www.npmjs.com/package/generate-schema documentation.
import * as generateSchema from 'https://esm.run/generate-schema';
import lyojsonToPrettyYaml from 'https://cdn.jsdelivr.net/npm/@lyo/json-to-pretty-yaml@1.2.2/+esm'
// import json2xml from 'https://cdn.jsdelivr.net/npm/json2xml@0.1.3/+esm'
// import xml2jsonLight from 'https://cdn.jsdelivr.net/npm/xml2json-light@1.0.6/+esm'
import xmlJs from 'https://cdn.jsdelivr.net/npm/xml-js@1.6.11/+esm'
// import requireJson5 from 'https://cdn.jsdelivr.net/npm/require-json5@1.3.0/+esm'
import JSON5 from 'https://unpkg.com/json5@2/dist/index.min.mjs'
import * as YAML from 'https://unpkg.com/js-yaml@4.1.0/dist/js-yaml.mjs';
import yamljs from 'https://cdn.jsdelivr.net/npm/yamljs@0.3.0/+esm'



// Select elements
const responseTextarea = document.querySelector('#response-textarea');
const convertedSchemaContainer = document.querySelector('#converted-schema-container');
const convertButton = document.querySelector('.decorated-button');
const clearResponseButton = document.querySelector('.clear-response');
const clearSchemaButton = document.querySelector('.clear-schema');
const icon_copy_container = document.querySelector('.icon-copy-container');
const file = document.querySelector('#fileInput')
const icon_copy_text = document.querySelector('#icon-copy')
const side_bar_container = document.querySelector('.side-bar ')
const side_bar = document.querySelectorAll('.side-bar p');

let toSchema = ""
let main_box_header = document.querySelector(".main-box-header")
let convert_box_header = document.querySelector(".convert-box-header")

let error_message

// side_bar.forEach((element) => {
//     element.addEventListener('click', () => {
//         // Check if the clicked element already has the active class
//         const isActive = element.classList.contains('side-bar-active');
        
//         // Remove the active class from all elements
//         side_bar.forEach(el => el.classList.remove('side-bar-active'));
        
//         // If the clicked element was not active, add the active class to it
//         if (!isActive) {
//             element.classList.add('side-bar-active');
//         }
//     });
// });

side_bar.forEach((element) => {
    element.addEventListener('click', () => {
        main_box_header.innerText=""
        convert_box_header.innerText=""
        // Remove the active class from all elements
        side_bar.forEach(el => el.classList.remove('side-bar-active'));
        element.classList.add('side-bar-active'); 
        toSchema = element.getAttribute("id")
        console.log(toSchema.split("-").join(""));
        
        switch(toSchema) {
            case "To-Json-Schema":
                main_box_header.innerText = "JSON"
                convert_box_header.innerText = "JSON Schema" 
                break;
            case "to-Yaml":
                main_box_header.innerText = "JSON"
                convert_box_header.innerText = "YAML" 
                break;
            case "to-XML":
                main_box_header.innerText = "JSON"
                convert_box_header.innerText = "XML" 
                break;
            case "js-to-json":
                main_box_header.innerText = "JS Object"
                convert_box_header.innerText = "JSON" 
                break;
            case "JS-Object-To-Json-Schema":
                main_box_header.innerText = "JS Object"
                convert_box_header.innerText = "JSON Schema" 
                break;
            case "JS-Object-To-XML":
                main_box_header.innerText = "JS Object"
                convert_box_header.innerText = "XML" 
                break;
            case "JS-Object-To-YAML":
                main_box_header.innerText = "JS Object"
                convert_box_header.innerText = "YAML"
                break;
            case "XML-to-JSON":
                main_box_header.innerText = "XML"
                convert_box_header.innerText = "JSON" 
                break;
            case "XML-to-YAML":
                main_box_header.innerText = "XML"
                convert_box_header.innerText = "YAML" 
                break;
            case "YAML-to-JSON":
                main_box_header.innerText = "YAML"
                convert_box_header.innerText = "JSON" 
                break;
            case "YAML-to-XML":
                main_box_header.innerText = "YAML"
                convert_box_header.innerText = "XML" 
                break;
        }
        console.log(toSchema);
        side_bar_container.style.height = "590px"
        
    });
});






//sidebar actions

//file upload

file.addEventListener('change', function(event) {
    
    
    var file = this.files[0];
    console.log(file);
    
    
    var reader = new FileReader();
    if (file.name.endsWith('.json')) {
        console.log("json");
        reader.onload = function(e) {
            const jsonContent = JSON.stringify(JSON.parse(e.target.result), null, 4);
            responseTextarea.value = jsonContent;
        };
        reader.readAsText(file);
    }else if(file){
        reader.onload = function(event) {
            var text = event.target.result;
            responseTextarea.value = text;
        };

        reader.readAsText(file);
    }
});




// Handle conversion to schema

convertButton.addEventListener("click", () => {
    const responseSchemaValue = responseTextarea.value.trim();
    const toSchemaAction = toSchema.split('-').join('');
    convertedSchemaContainer.style.whiteSpace = "pre-wrap";  // Set white-space for all cases

    if (!responseSchemaValue) {
        convertedSchemaContainer.innerText = "Please enter a valid response.";
        return;
    }

    try {
        switch (toSchemaAction) {
            case "ToJsonSchema":
                // Parse the JSON input and generate schema
                const parsedResponse = JSON.parse(responseSchemaValue);
                const generatedSchema = generateSchema.json(parsedResponse);
                convertedSchemaContainer.innerText = JSON.stringify(generatedSchema, null, 2);
                break;

            case "toYaml":
                const parsedYamlResponse = JSON.parse(responseSchemaValue);
                const generatedYaml = lyojsonToPrettyYaml.stringify(parsedYamlResponse);
                convertedSchemaContainer.innerText = generatedYaml;
                break;

            case "toXML":
                const parsedXmlResponse = JSON.parse(responseSchemaValue);
                const wrappedResponse = { root: parsedXmlResponse }; // Wrap JSON in a root element
                const xmlOptions = { compact: true, ignoreComment: true, spaces: 2 };
                const generatedXML = xmlJs.json2xml(wrappedResponse, xmlOptions);
                const xmlWithHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' + generatedXML;
                convertedSchemaContainer.innerText = xmlWithHeader;
                break;

            case "jstojson":
                // Parse as a JavaScript object and convert to JSON
                // const jsObject = eval(`(${responseSchemaValue})`); // Consider changing eval() for security
                const jsObject = JSON5.parse(responseSchemaValue)
                convertedSchemaContainer.innerText = JSON.stringify(jsObject, null, 4);
                break;

            case "JSObjectToJsonSchema":
                // const jsSchemaObject = eval(`(${responseSchemaValue})`); // Same eval warning
                const jsSchemaObject = JSON5.parse(responseSchemaValue)
                const jsonSchema = generateSchema.json(jsSchemaObject);
                convertedSchemaContainer.innerText = JSON.stringify(jsonSchema, null, 4);
                break;
            case "JSObjectToXML":
                // const jsSchemaObject = eval(`(${responseSchemaValue})`); // Same eval warning
                const jsObjectXml = JSON5.parse(responseSchemaValue)
                const wrappedResponseJSObjectToXML = { root: jsObjectXml};
                const JSObjectToXMLxmlOptions = { compact: true, ignoreComment: true, spaces: 2 };
                const jsToXml = xmlJs.js2xml(wrappedResponseJSObjectToXML, JSObjectToXMLxmlOptions);
                const JSObjectToXMLxmlWithHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' + jsToXml;
                convertedSchemaContainer.innerText = JSObjectToXMLxmlWithHeader
                break;
                
            case "JSObjectToYAML":
                // const jsSchemaObject = eval(`(${responseSchemaValue})`); // Same eval warning
                const jsObjectYAML = JSON5.parse(responseSchemaValue)
                const jsToYAML = lyojsonToPrettyYaml.stringify(jsObjectYAML);
                convertedSchemaContainer.innerText = jsToYAML;
                break;

            case "XMLtoJSON":
                const xmlOptionsForJson = { compact: true, ignoreComment: true, spaces: 2 };
                const generatedJsonFromXml = xmlJs.xml2json(responseSchemaValue, xmlOptionsForJson);
                convertedSchemaContainer.innerText = generatedJsonFromXml;
                break;
            case "XMLtoYAML":
                const xmlOptionsForyaml = { compact: true, ignoreComment: true, spaces: 2 };
                const generatedYamlFromXml = xmlJs.xml2js(responseSchemaValue, xmlOptionsForyaml);
                convertedSchemaContainer.innerText = YAML.dump(generatedYamlFromXml);
                break;
            case "YAMLtoJSON":
                const yamlInput = responseSchemaValue;

                let parsedJson
                // Convert YAML to JSON
                if(yamlInput.startsWith("{")||yamlInput.startsWith("[")|| yamltoxmlInput.trim().startsWith("<?xml") || yamltoxmlInput.trim().startsWith("<")){
                   throw new Error("Invalid YAML"); 
                }else{
                    // parsedJson = YAML.load(yamlInput);
                    parsedJson = yamljs.parse(yamlInput);
                }

                // Display the parsed JSON
                convertedSchemaContainer.innerText = JSON.stringify(parsedJson, null, 2);
                break;
            case "YAMLtoXML":
                const yamltoxmlInput = responseSchemaValue;

                let parsedYAMLtoXML
                // Convert YAML to JSON
                if(yamltoxmlInput.startsWith("{")||yamltoxmlInput.startsWith("[") || yamltoxmlInput.trim().startsWith("<?xml") || yamltoxmlInput.trim().startsWith("<")){
                   throw new Error("Invalid YAML"); 
                }else{
                    // parsedYAMLtoXML = YAML.load(yamltoxmlInput);
                    parsedYAMLtoXML = yamljs.parse(yamltoxmlInput);
                }
                console.log(parsedYAMLtoXML);
                

                const wrappedResponseYAMLtoXML = { root: parsedYAMLtoXML }; // Wrap JSON in a root element
                const YAMLtoXMLOptions = { compact: true, ignoreComment: true, spaces: 2 };
                const generatedYAMLtoXML = xmlJs.js2xml(wrappedResponseYAMLtoXML, YAMLtoXMLOptions);
                const yAMLToXMLWithHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' +generatedYAMLtoXML;
                convertedSchemaContainer.innerText = yAMLToXMLWithHeader;
                break;
            default:
                alert("Please select a valid conversion action.");
                break;
        }
    } catch (error) {
        console.error(`${toSchemaAction} failed:`, error);
        convertedSchemaContainer.innerText = `Invalid format for ${toSchemaAction} conversion!`;
        error_message = false
    }
});


//-----------
//download buttons

const download_container = document.querySelector('.download-container')
function downloadFile(file_name, type){
    const filename = file_name;
    const blob = new Blob([convertedSchemaContainer.innerText], { type: type });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);  // Append to body to make sure the link is clickable
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url); // Clean up the created object URL
    document.body.removeChild(a); // Remove the link element from the DOM
}


download_container.addEventListener('click', (event) => {
    const toSchemaAction = toSchema.split('-').join('');

    // let errorMessages = [];

    // // Validate schema action
    // if (!toSchemaAction) {
    //     errorMessages.push("Action is not defined or invalid.");
    // }
    
    // // Check if the action is 'ToJsonSchema'
    // if (toSchemaAction !== "ToJsonSchema") {
    //     errorMessages.push("Invalid action. Please make sure the action is 'ToJsonSchema'.");
    // }
    
    // // Validate schema content
    // if (!convertedSchemaContainer.innerText) {
    //     errorMessages.push("The schema content is empty. Please provide valid schema data.");
    // }
    
    // // Check for any existing errors
    // if (error_message) {
    //     errorMessages.push("Error found: " + error_message);
    // }

    // // If there are any errors, show them in a single alert
    // if (errorMessages.length > 0) {
    //     alert(errorMessages.join('\n'));  // Combine errors with line breaks
    //     return;  // Stop further execution
    // }

    // // If no errors, proceed with the download
    // downloadFile('converted_schema.json', 'application/json');
  

    function handleDownload(fileName, mimeType) {
        if (convertedSchemaContainer.innerText) {
            downloadFile(fileName, mimeType);
        } else {
            alert("Invalid");
        }
    }
    
    switch (toSchemaAction) {
        case "ToJsonSchema":
        case "jstojson":
        case "JSObjectToJsonSchema":
        case "XMLtoJSON":
        case "YAMLtoJSON":
            handleDownload('converted_json.json', 'application/json');
            break;
    
        case "toYaml":
        case "JSObjectToYAML":
        case "XMLtoYAML":
            handleDownload('converted_yaml.yaml', 'application/yaml');
            break;
    
        case "toXML":
        case "JSObjectToXML":
        case "YAMLtoXML":
            handleDownload('converted_xml.xml', 'application/xml');
            break;
    
        default:
            alert("Invalid action");
            break;
    }
    
     
})







// Handle clearing the response
clearResponseButton.addEventListener("click", () => {
     
    // Clear the textarea content
    responseTextarea.value = ''; 
    
    // Reset the file input
    file.value = ''; 
});

clearSchemaButton.addEventListener("click", () => {
    convertedSchemaContainer.innerText = ''; // Clear the converted schema container
});

icon_copy_container.addEventListener("click", async() => {
    try {
        if (convertedSchemaContainer.innerText === '') {
            throw new Error('No schema to copy.');
        }
        await navigator.clipboard.writeText(convertedSchemaContainer.innerText);
        icon_copy_text.innerText = "Copied!"
        setTimeout(()=>{
            icon_copy_text.innerText = "Copy"
        }, 3000);
        // alert('Copied the text: ' + convertedSchemaContainer.innerText);
    } catch (err) {
        alert('Failed to copy text: ' + err);
    }
});








//----------------------------------------------------------------------------------------------------------------------------------------------------------------





// convertButton.addEventListener("click", () => {
//     let toSchemaAction = toSchema.split('-').join('')
//     console.log(toSchemaAction);
    
//     if(toSchemaAction === "ToJsonSchema"){
//             const responseSchemaValue = responseTextarea.value.trim();
//             if (responseSchemaValue) {
//                 try {
//                     // Parse the JSON input
//                     const parsedResponse = JSON.parse(responseSchemaValue);
        
//                     // Generate schema from the parsed response
//                     const generatedSchema = generateSchema.json(parsedResponse);
        
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Display the generated schema in the container
//                     convertedSchemaContainer.innerText = JSON.stringify(generatedSchema, null, 2);
//                 } catch (error) {
//                     console.error("Invalid JSON:", error);
//                     convertedSchemaContainer.innerText = "Invalid JSON format!";
//                 }
//             } else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JSON response.";
//             }
//     }else if(toSchemaAction === "toYaml"){
//             const responseSchemaValue = responseTextarea.value.trim();
        
//             if (responseSchemaValue) {
//                 try {
//                     // Parse the JSON input
//                     const parsedResponse = JSON.parse(responseSchemaValue);
        
//                     // Generate schema from the parsed response
//                     const generatedYaml = lyojsonToPrettyYaml.stringify(parsedResponse);
        
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Display the generated schema in the container
//                     convertedSchemaContainer.innerText = generatedYaml
//                 } catch (error) {
//                     console.error("Invalid JSON:", error);
//                     convertedSchemaContainer.innerText = "Invalid JSON format!";
//                 }
//             } else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JSON response.";
//             }
//     }else if(toSchemaAction === "toXML"){
//             const responseSchemaValue = responseTextarea.value.trim();
        
//             if (responseSchemaValue) {
//                 try {
//                    // Parse the JSON input
//                     const parsedResponse = JSON.parse(responseSchemaValue);
                    
//                     // Wrap JSON in a root element if not already present
//                     const wrappedResponse = { root: parsedResponse };
                    
//                     // Define options for XML conversion
//                     const options = { compact: true, ignoreComment: true, spaces: 2 };
                    
//                     // Convert JSON to XML
//                     const generatedXML = xmlJs.json2xml(wrappedResponse, options);
                    
//                     // Prepend XML declaration
//                     const xmlWithHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' + generatedXML;
        
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Display the generated XML in the container
//                     convertedSchemaContainer.innerText = xmlWithHeader;
//                 } catch (error) {
//                     console.error("Invalid JSON:", error);
//                     convertedSchemaContainer.innerText = "Invalid JSON format!";
//                 }
//             } else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JSON response.";
//             }
//         }else if(toSchemaAction === "jstojson"){
//             const responseSchemaValue = responseTextarea.value.trim();
//             if(responseSchemaValue){
//                 try {
//                      // Parse the input as a JavaScript object
//                     const jsObject = eval(`(${responseSchemaValue})`);
    
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Convert JS object to JSON string and display it in the container
//                     convertedSchemaContainer.innerText = JSON.stringify(jsObject, null, 4);
                    
//                 } catch (error) {
//                     console.error("Invalid JS Object:", error);
//                     convertedSchemaContainer.innerText = "Invalid JS Object format!";
//                 }
//             }else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JS Object response.";
//             }
//         }else if(toSchemaAction === "JSObjectToJsonSchema"){
//             const responseSchemaValue = responseTextarea.value.trim();
//             if(responseSchemaValue){
//                 try {
//                      // Parse the input as a JavaScript object
//                     const jsObject = eval(`(${responseSchemaValue})`);
    
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Convert JS object to JSON string and display it in the container
//                     const json = generateSchema.json(jsObject)
//                     convertedSchemaContainer.innerText = JSON.stringify(json, null, 4);
                    
//                 } catch (error) {
//                     console.error("Invalid JS Object:", error);
//                     convertedSchemaContainer.innerText = "Invalid JS Object format!";
//                 }
//             }else {
//                 convertedSchemaContainer.innerText = "Please enter a valid JS Object response.";
//             }
//         }else if(toSchemaAction === "XMLtoJSON"){
       
//             const responseSchemaValue = responseTextarea.value.trim();
        
//             if (responseSchemaValue) {
//                 try {
                    
//                     const options = { compact: true, ignoreComment: true, spaces: 2 };
//                     const generatedJsonFromXml = xmlJs.xml2json(responseSchemaValue, options);
        
//                     convertedSchemaContainer.style.whiteSpace = "pre-wrap";
//                     // Display the generated schema in the container
//                     convertedSchemaContainer.innerText = generatedJsonFromXml
//                 } catch (error) {
//                     console.error("Invalid JSON:", error);
//                     convertedSchemaContainer.innerText = "Invalid XML format!";
//                 }
//             } else {
//                 convertedSchemaContainer.innerText = "Please enter a valid XML response.";
//             }
//     }
//     else{
//         alert("Please select a valid conversion action.");
//     }
// });



// switch (toSchemaAction) {
//     case "ToJsonSchema":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_schema_from_json.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "toYaml":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_yaml.yaml', 'application/yaml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "toXML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_xml.xml', 'application/xml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "jstojson":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_json.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "JSObjectToJsonSchema":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_schema.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "JSObjectToXML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_xml.xml', 'application/xml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "JSObjectToYAML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_yaml.yaml', 'application/yaml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "XMLtoJSON":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_json.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "XMLtoYAML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_yaml.yaml', 'application/yaml');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "YAMLtoJSON":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_json.json', 'application/json');
//         } else {
//             alert("Invalid");
//         }
//         break;
//     case "YAMLtoXML":
//         if (convertedSchemaContainer.innerText) {
//             downloadFile('converted_xml.xml', 'application/xml');
//         } else {
//             alert("Invalid");
//         }
//         break;
    

//     default:
//         alert("Invalid action");
//         break;
// }
