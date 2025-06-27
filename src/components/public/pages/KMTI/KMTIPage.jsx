import React, { useEffect, useState } from 'react';
import PublicLayout from '../../components/PublicLayout';
import PageHeader from '../../components/PageHeader';
import KMTISection from './KMTISection';
import { GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';
import Footer from '../../components/Footer'

const KMTIPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('kmti'), {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch KMTI page content');
        }
        const data = await response.json();
        setPageContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  if (loading) {
    return (
      <PublicLayout>
        <PageHeader pageName="Kismayo Midwifery Training Institute (KMTI)" />
        <div className="container mx-auto p-4 text-center">Loading KMTI content...</div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <PageHeader pageName="Kismayo Midwifery Training Institute (KMTI)" />
        <div className="container mx-auto p-4 text-red-500 text-center">Error: {error}</div>
      </PublicLayout>
    );
  }

  const kmtiSection = pageContent?.section_assigned_ids?.find(
    (section) => section.section?.section_type === 'KMTI'
  )?.section;

  return (
    <PublicLayout>
      <PageHeader pageName="Kismayo Midwifery Training Institute (KMTI)" />
      {kmtiSection && <KMTISection section={kmtiSection} />}
      {!kmtiSection && (
        <div className="container mx-auto p-4 text-center">No KMTI content available.</div>
      )}
       <Footer/>
    </PublicLayout>
    
  );
};

export default KMTIPage;