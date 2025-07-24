import React from 'react';
import PageHeader from '../../../components/PageHeader';
import Footer from '../../../components/Footer';

const MarwoCaafimaadPage = () => {
  return (
    <div>
      <PageHeader pageName="Marwo Caafimaad" />
      <div className="container mx-auto p-4 w-full lg:w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-8">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">About the Marwo Caafimaad Project</h2>
            <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
            <p className="text-gray-700">
              Primary Health Care (PHC) is defined by the Alma Ata Declaration as ‘‘the first level of contact of individuals, the family, and community with the national health system’’ and ‘‘the first element of a continuing healthcare process’’. The Alma Ata declaration identified Community Health Workers as one of the cornerstones of comprehensive primary health care. Development of delivery of care based on PHC approach has shifted toward the deployment of various types of community health workers as a cadre at the community level who deliver low-cost, life- saving and effective PHC services at the community and household level to protect and promote public health and link community members with the PHC facilities. Therefore; countries signatory to the declaration considered them establishment of a community health workers’ programme synonymous with the primary health care (PHC) approach.
            </p>
            <p className="text-gray-700 mt-4">
              A policy debate in the context of community health workers was whether those workers would be static providers or should provide outreach services at community settings and doorstep of households. Evidence suggests that community workers who have access to households through doorstep services contribute more positively to the health outcomes especially in relation to Reproductive, Maternal, Newborn and Child Health (RMNCH) , Nutrition services and control of communicable diseases. Experiences derived from different countries across the world have been shown that the services are more acceptable by the local communities if delivered by a local health worker, interventions are more sustained and continuity of care is more secure through this intervention.
            </p>
          </div>
          <div>
            <img src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/77c44a9c-290e-4114-a1f2-647b3c74715c.jpeg" alt="Marwo Caafimaad Project Image" className="rounded-lg shadow-lg" />
            <div className="text-center mt-4">
              <p className="text-2xl font-bold">Abdirahman Ibrahim</p>
              <p className="text-xl text-gray-600">Project Manager</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-8">
          <div>
            <img src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/c0eb697b-836c-426b-a7f5-86219a2ed65c.jpeg" alt="Project Objectives" className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">Key Aspects</h2>
            <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
            <p className="text-gray-700 mb-4">
              As community based health worker has to respond to local societal and cultural norms and customs to ensure community acceptance and ownership so most of countries have largely relied on females as community health workers. Although both men and women are employed at grass-roots level, globally, there is evidence that female workers are able to deliver care more effectively and acceptable than male workers at the community level due to cultural issues. While this may be true of reproductive, maternal, newborn and child health (RMNCH) and nutrition related services, the role of male workers in provision of environmental health and control of epidemics (in the past), such as cholera, small-pox and plague, at the community level has been substantial across countries. Nonetheless, there has been even an explicit policy shift in some countries to replace male health workers with female workers at the community level.
            </p>
            <p className="text-gray-700 mb-4">
              In Somalia, the static community health workers (CHW) intervention started earlier by deploying mostly male workers at health posts (static facilities) and considered them as an important and integral part of health system workforce that aims to provide essential package of health services (EPHS) and improve coverage especially for rural and remote areas. The Somali Essential Package of Health Services foresees up- gradation of Health Posts to Primary Health Units (PHU). Therefore, community-based female health worker concept emerged to introduce a cadre who could offer mainly RMNCH and nutrition services, at the doorstep of households.
            </p>
          </div>
        </div>

        <div className="py-8">
          <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">Programmatic Impact</h2>
          <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Operationalizing Policy Priorities</h3>
              <p className="text-gray-700">The community based ‘Marwo Caafimaad’ - Female Health Workers’ Programme is expected to play an important role to operationalize the policy priorities of Somaliland, Puntland and Central South Somalia through providing services at the doorstep of the households that will effectively contribute to achieving health and poverty reduction objectives.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Contributing to Health Equity</h3>
              <p className="text-gray-700">The programme is expected to contribute to health equity and improve the health of poor and disadvantaged communities and in particular vulnerable groups such as women, girls and children.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Bridging Health Service Gaps</h3>
              <p className="text-gray-700">This intervention is based on a Somali programmatic and health system reform with a concept of bridging the gap between available static health services and communities through linking the community members with the health system and providing people-centered integrated primary health care services through community based ‘Marwo Caafimaad’ - Female Health Workers (FHW) at the doorsteps of households.</p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default MarwoCaafimaadPage;