import AdminProfileSettings from "../../../components/adminProfileForm.component/adminProfileForm.component";
const AdminProfile = () => {
  return (
    <>
      <div className="w-full min-h-screen flex">
        <div className="w-full flex-row ">
          <AdminProfileSettings />
        </div>
      </div>
    </>
  );
};
export default AdminProfile;
