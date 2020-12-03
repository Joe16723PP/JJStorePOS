/* tslint:disable:no-inferrable-types no-trailing-whitespace variable-name */
import {Injectable} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf'
      },
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf'
      }
    };
  }

  file_type: string = '.pdf';

  private static printPdfFile(pdf: object): void {
    pdfMake.createPdf(pdf).print();
  }

  public createPdfFile(json: any[], header: string): object {

    const table = [];
    const headerTable = Object.keys(json[0]);

    for (let i = 0; i < json.length; i++) {

      const body = Object.values(json[i]);

      if (i !== 0) {
        table.push(body);
      } else {
        table.push(headerTable);
        table.push(body);
      }

    }

    return {
      pageSize: 'A4',

      // by default we use portrait, you can change it to landscape if you wish
      // pageOrientation: 'landscape',

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [10, 10],
      content: [
        {text: header, style: 'header'},
        {
          table: {
            headerRows: 1,
            body: table
          }
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          bold: true,
        },
        tableExample: {
          margin: [0, 0, 0, 0]
        },
        tableHeader: {
          bold: true,
          fontSize: 8,
          color: 'black'
        }
      },
      defaultStyle: {
        font: 'THSarabunNew'
      }
    };
  }

  public exportAsPdfFile(json: any[], header: string, option: string): void {
    const pdf = this.createPdfFile(json, header);
    if (option === 'print') {
      PdfService.printPdfFile(pdf);
    } else if (option === 'download') {
      this.downloadPdfFile(pdf, header);
    }
  }

  public downloadPdfFile(pdf: object, header: string): void {
    pdfMake.createPdf(pdf).download(header + this.file_type);
  }
}
