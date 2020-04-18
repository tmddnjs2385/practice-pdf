

// import React, { useRef, useEffect} from 'react';
// import PropTypes from 'prop-types';

// import pdfjs from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const PdfComponent = ({ src ,Page}) => {

//   const canvasRef = useRef(null)

  
 
//   useEffect(() => {
    
//     const fetchPdf = async() => {

//       const loadingTask = pdfjs.getDocument(src);

//       const pdf =await loadingTask.promise;

//       const page = await pdf.getPage(Page);
     
//       const scale = 1.5;

//       const viewport = page.getViewport({scale: scale});
//       // Prepare canvas using PDF page dimensions
//       const canvas = canvasRef.current;

//       const context = canvas.getContext('2d');
//       canvas.height = viewport.height;
//       canvas.width = viewport.width;

//       // Render PDF page into canvas context
//       const renderContext = {
//         canvasContext: context,
//         viewport: viewport
//       };
//       const renderTask = page.render(renderContext);

//       await renderTask.promise;

//     };

//     fetchPdf();
//   }, [src]);

//   return (
//     <>
//     <canvas
//       ref={canvasRef}
//       width={window.innerWidth}
//       height={window.innerHeight}
//     />
//     </>
//   );
// }

// PdfComponent.propTypes = {
//   src: PropTypes.string
// };

// PdfComponent.defaultProps = {
//   src: `${process.env.PUBLIC_URL}/helloworld.pdf`
// };

// export default PdfComponent;
import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from 'react-pdf-js';


const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    let previousButton = <li className="previous" onClick={() => setPage(page - 1)}>Previous<i className="fa fa-arrow-left"></i></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled">Previous<i className="fa fa-arrow-left"></i></li>;
    }
    let nextButton = <li className="next" onClick={() => setPage(page + 1)}>Next <i className="fa fa-arrow-right"></i></li>;
    if (page === pages) {
      nextButton = <li className="next disabled">Next <i className="fa fa-arrow-right"></i></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  const canvasEl = useRef(null);
  
  const [loading, numPages] = usePdf({file: './hw1.pdf', page, canvasEl });

  useEffect(() => {
    setPages(numPages);
  }, [numPages]);

  return (
    <div>
       {loading && <span>Loading...</span>} 
     
      <canvas ref={canvasEl} />
      {renderPagination(page, pages)}
    
    </div>
  );
}

export default MyPdfViewer;