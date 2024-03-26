export class StringExtension extends String{
    replaceAll(searchStr,replaceStr){
      var str = this;
  
     // no match exists in string?
     if(str.indexOf(searchStr) === -1) {
         // return string
         return str;
     }
  
     // replace and remove first match, and do another recursirve search/replace
     return (str.replace(searchStr, replaceStr)).replaceAll(searchStr, replaceStr);
    }
  }