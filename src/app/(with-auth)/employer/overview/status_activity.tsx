export default function StatusActivity(){
    return (
        <div className="row">
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>Total Users</strong></span>
                    <br />
                    <br />
                    <h3>1,240</h3>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>Active Jobs</strong></span>
                    <br />
                    <br />
                    <h3>8</h3>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>Interviews</strong></span>
                    <br />
                    <br />
                    <h3>14</h3>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="border rounded-3 p-2 statusActivity">
                    <span className="text-primary"><strong>Company</strong></span>
                    <br />
                    <br />
                    <h3>6</h3>
                </div>
            </div>
        </div>
    )
}