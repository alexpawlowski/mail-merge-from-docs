/* from http://www.labnol.org/internet/auto-confirmation-emails/28386/ */
/* Send Confirmation Email with Google Forms */
 
function Initialize() {
 
  var triggers = ScriptApp.getProjectTriggers();
  var documentTemplateID="EmailTemplateDocId"
 
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
 
  ScriptApp.newTrigger("SendConfirmationMail")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
 
}

function SendConfirmationMail(e) {
 
  try {
 
    var ss, cc, sendername, subject, columns;
    var message, value, textbody, sender;
 
    // This is your email address and you will be in the CC
    // cc = "cfwstem@gmail.com";
    
    // This is your email address and you will be in the replyTo
    replyTo = "cfwstem@utk.edu";
 
    // This will show up as the sender's name
    sendername = "CFW STEM Committee";
 
    // Optional but change the following variable
    // to have a custom subject for Google Docs emails
    subject = "Your Abstract for the 2nd Annual Tennessee Women in STEM Research Symposium Has Been Received";
 
    // This is the body of the auto-reply
    message = getDocumentTemplate(); //"We have received your details.<br>Thanks!<br><br>";
 
    ss = SpreadsheetApp.getActiveSheet();
    columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];
 
    // This is the submitter's email address
    // Make sure you havea  field called Email Address in the Google Form
    sender = e.namedValues["Email Address"].toString();
    Logger.log(sender);
    
    Logger.log(message);
    
    message = message.replace("<<First Name>>", e.namedValues["First Name"].toString());
    
    Logger.log(message);
 /*
    // Only include form values that are not blank
    for (var keys in columns) {
      var key = columns[keys];
      var val = e.namedValues[key] ? e.namedValues[key].toString() : "";
      if (val !== "") {
        message += key + ' :: ' + val + "<br />";
      }
    }
 */
     htmlbody = message.replace("\n", "<br /> <br />");
    Logger.log(htmlbody);
 // update to MailApp, use more flexible option of SendEmail
    MailApp.sendEmail({
      to: sender,
      subject: subject,
      replyTo: replyTo,
      name: sendername,
      htmlBody: htmlbody
    });
 
  } catch (e) {
    Logger.log(e.toString());
  }
 
}

/* from http://blog.knoldus.com/2013/02/04/google-apps-script-read-google-document-as-template/ */
// Get Template(Document) id defined in the Project Proerties
 var documentTemplateID="EmailTemplateDocId"

//var emailSubject="Document Template"
//var user_emailId='<email_id>'
 
//function sendDocumentTemplate(){
 //var mailBody= getDocumentTemplate();
// Sending the document Template
 //GmailApp.sendEmail(user_emailId, emailSubject, mailBody);
//}
 
/*
* It returns the document template
*/
 
function getDocumentTemplate() {
//Get Document ID from Project Properties
  
   // Gets the user property Document ID
 //var userProperties = PropertiesService.getScriptProperties();
 //var nickname = userProperties.getProperty('nickname');
 var templateDocId= PropertiesService.getScriptProperties().getProperty(documentTemplateID);//ScriptProperties.getProperty(documentTemplateID);
  Logger.log('Template ID');
  Logger.log(templateDocId);
  // Make Document's copy that would be send
 // deprecatedvar docId= DocsList.getFileById(templateDocId).makeCopy().getId();
 var doc=DocumentApp.openById(templateDocId);
 var body=doc.getActiveSection();
 var html=body.getText();
//Delete the document's copy after send the mail
 //DocsList.getFileById(docId).setTrashed(true);
 return html;
}
