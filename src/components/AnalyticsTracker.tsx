import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/lib/firebase';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackPage = async () => {
      try {
        const analyticsInstance = await analytics;
        if (analyticsInstance) {
          logEvent(analyticsInstance, 'page_view', {
            page_path: location.pathname + location.search,
            page_title: document.title,
          });
        }
      } catch (error) {
        console.error("Error logging page view:", error);
      }
    };

    trackPage();
  }, [location]);

  return null;
}
