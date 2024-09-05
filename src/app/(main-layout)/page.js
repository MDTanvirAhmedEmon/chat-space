import MobileSideBar from "@/components/MobileSideBar";


const chatBox = () => {
    return (
        <div>
            <div className={`  block md:hidden sticky top-0 right-0 left-0 bottom-0 bg-[#2424240a] shadow w-full h-[100vh] p-4`}>
                <MobileSideBar />
            </div>
        </div>
    );
};

export default chatBox;

