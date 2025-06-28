import React, { useState, useEffect } from 'react';
import PublicLayout from '../../components/PublicLayout';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import { GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';

const OrganogramPage = () => {
  const [organogramImage, setOrganogramImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganogramData = async () => {
      try {
        const response = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('organogram'), {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch organogram data');
        }
        const data = await response.json();
        const organogramSection = data?.section_assigned_ids?.find(
          (section) => section.section?.section_type === 'Organogram'
        )?.section;
        if (organogramSection && organogramSection.columns?.column1?.images?.length > 0) {
          setOrganogramImage(organogramSection.columns.column1.images[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganogramData();
  }, []);

  if (loading) {
    return <PublicLayout><div className="text-center py-8">Loading...</div></PublicLayout>;
  }

  if (error) {
    return <PublicLayout><div className="text-center py-8 text-red-500">Error: {error}</div></PublicLayout>;
  }

  return (
    <PublicLayout>
      <PageHeader pageName="Organogram" />
      <div className="container mx-auto p-4 w-full lg:w-4/5 flex justify-center">
        {organogramImage ? (
          <img src={organogramImage} alt="Ministry Organogram" className="max-w-full h-auto" />
        ) : (
          <p className="text-lg">Organogram image not available.</p>
        )}
      </div>
      <Footer />
    </PublicLayout>
  );
};

export default OrganogramPage;