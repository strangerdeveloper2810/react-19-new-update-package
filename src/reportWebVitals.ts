import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

const reportWebVitals = (): void => {
  onCLS(console.log); // Log chỉ số Cumulative Layout Shift (CLS)
  onFCP(console.log); // Log chỉ số First Contentful Paint (FCP)
  onINP(console.log); // Log chỉ số Interaction to Next Paint (INP)
  onLCP(console.log); // Log chỉ số Largest Contentful Paint (LCP)
  onTTFB(console.log); // Log chỉ số Time to First Byte (TTFB)
};

export default reportWebVitals;
