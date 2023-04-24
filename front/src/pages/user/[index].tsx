import { GetServerSideProps } from 'next';

import { UserPage } from '@/components/UserPage/UserPage';
import { IUserPageSSRData } from '@/interface';

export default function UserDataPage({ pageData }: IUserPageSSRData) {
  return (
      <UserPage name={pageData.name} email={pageData.email} todos={pageData.todos} _id={pageData._id}/>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.headers.cookie!;
  const params = context?.query?.index;
  const response = await fetch(`http://localhost:4000/user/${params}`, {
    headers: {
      Cookie: cookie
    }
  });
  const pageData = await response.json();
  return { props: { pageData } };
};
