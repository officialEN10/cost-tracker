import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvExportService {
  
  downloadCSV(data: any[], filename: string) {
    // we convert the data to CSV format
    let csvData = this.convertToCSV(data);
  
    // we create a Blob object from the CSV string
    let blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    
    // Create a hidden anchor element
    let downloadLink = document.createElement("a");
    
    // Create a URL for the Blob object
    let url = URL.createObjectURL(blob);

    // Set the href to the object URL
    downloadLink.setAttribute("href", url);
    // Set the download attribute to the desired filename
    downloadLink.setAttribute("download", filename);
    
    // Hide the anchor element
    // downloadLink.style.visibility = "hidden";
    
    // Attach the anchor element to the body
    // document.body.appendChild(downloadLink);
    
    // Simulate a click of the anchor element
    downloadLink.click();
    
    // Remove the anchor element from the body
    // document.body.removeChild(downloadLink);
  }

  // Function to convert an array of objects to CSV data
  convertToCSV(objArray: any[]): string {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = "";

    // Create the header row
    for (let index in objArray[0]) {
        // Convert each value to a string and separate with commas
        row += index + ',';
    }
    row = row.slice(0, -1);  // Remove trailing comma
    str += row + '\r\n';  // Add line break after header row

    // Create data rows
    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
  }
}
