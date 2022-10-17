import { Component, HostListener, OnInit, ViewChild, VERSION, Input, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import { AppModule } from '../../app.module';
import { saveAs } from 'file-saver';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer-modal',
  templateUrl: './pdf-viewer-modal.component.html',
  styleUrls: ['./pdf-viewer-modal.component.scss']
})
export class PdfViewerModalComponent implements OnInit {
  @Input() public pdfItem;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  pdfSrc;
  name = 'Angular ' + VERSION.major;
  loadedfile;
  // pdfSrc;
  pageVariable = 1;
  zoom = 1
  angle = 0

  // Call backs Monitor
  errorTriggeredCb = 0;
  afterpageLoadedCb = 0;
  pageRenderCb = 0;
  textLayerRenderedCb = 0;
  pdf: PDFDocumentProxy;
  isPdfLoaded: boolean;

  _base64ToArrayBuffer(base64) {    
	  var binary_string = base64.replace(/\\n/g, '');
    binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

  constructor(private sanitizer: DomSanitizer, private activeModal: NgbActiveModal,) {

  }

  ngOnInit(): void {
    console.log('this.pdfItem', this._base64ToArrayBuffer(this.pdfItem.pdf));
    this.pdfSrc = this._base64ToArrayBuffer(this.pdfItem.pdf);
  }

  onLoaded(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isPdfLoaded = true;
  }

  plusZoom() {
    this.zoom++;
  }

  minusZoom() {
    if (this.zoom > 1) {
      this.zoom--;
    }
  }

  rotate() {
    console.log(this.angle);
    if (this.angle === 0) {
      this.angle = 90;
    } else if (this.angle === 90) {
      this.angle = 180;
    } else if (this.angle === 180) {
      this.angle = 0;
    }
  }


  nextPage() {
    this.pageVariable++;
  }

  previousPage() {
    if (this.pageVariable > 1) {
      this.pageVariable--;
    }
  }

  afterLoadComplete(pdf: any) {
    this.afterpageLoadedCb++;
    console.log('after-load-complete');
  }

  pageRendered(e: CustomEvent) {
    this.pageRenderCb++;
    console.log('(page-rendered)');
  }

  textLayerRendered(e: CustomEvent) {
    // Callback Monitor variable
    this.textLayerRenderedCb++;

    // Finds anchors and sets hrefs void
    this.disableAnchorLinks();
    console.log('(text-layer-rendered)');

  }

  onFileSelected() {
    let $img: any = document.querySelector('#file');
    this.loadedfile = $img.files[0]

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }

  cleanup() {
    this.errorTriggeredCb = 0;
    this.afterpageLoadedCb = 0;
    this.pageRenderCb = 0;
    this.textLayerRenderedCb = 0;
  }

  errorTest(event) {
    this.errorTriggeredCb++;
    console.log(event, 'errorCalback')
  }

  disableAnchorLinks() {
    let externalLinks: HTMLCollectionOf<HTMLAnchorElement>;
    const pdfReport = document.getElementById('pdf-report-id');

    if (pdfReport) {
      externalLinks = pdfReport.getElementsByTagName('a');
    }
    for (let i = 0; i < externalLinks.length; i++) {
      externalLinks[i].href = "JavaScript:void(0);"
    }
  }

  print() {
    const pdf = new Blob([this.pdfSrc], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(pdf);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  }

  download() {
    var file = new Blob([this.pdfSrc], {
        type: 'application/pdf'
    });
    saveAs(file, "pdf.pdf");
  }

  dismiss() {
    this.activeModal.dismiss();
    this.passEntry.emit(true);
  }
}

