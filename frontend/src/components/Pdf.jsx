import React from 'react';
import { Document, Page } from '@react-pdf/renderer';

const PDFViewer = ({ pdfUrl }) => {
  return (
    <div style={{ width: '100%', height: '100%', position:'fixed' }}>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
