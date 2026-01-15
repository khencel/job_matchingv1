export default function RecentActivity(){
    return (
        <div className="border p-2">
            <h4>Recent Activity</h4>
            <div className="row">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>Khenneth applied for Web Developer</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>You hired Russel for UI designer</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>McAndrew applied for Web Developer</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="applicant_avatar" style={{backgroundImage:"url('/img/service/animated_guy.png')"}}>

                    </div>
                </div>
                <div className="col-md-10 pt-2">
                    <span>McAndrew applied for Full Stack Developer</span>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <button className="btn btn-primary-custom w-100">View All Activity</button>
                </div>
            </div>
        </div>
    )
}