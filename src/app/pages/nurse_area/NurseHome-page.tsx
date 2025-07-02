import SideNav from '../../../components/StaffSideNav';



export default function NurseHomePage() {
   
    //Dùng account Service để gọi API Get Account Detail lấy account detail rồi bỏ vào local storage
    
    return (
        <div className="normal-page">
            <SideNav/>
            <p>NursePage</p>
        </div>
        
    );
}