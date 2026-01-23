export default function Body({data}:{data:any}){
    return(
        <>
            <div className="py-4">
                <div className="row">
                    <div className="col">
                        <h3><strong>Company Profile</strong></h3>
                        <p
                            className="first-indent lh-lg text-secondary"
                            dangerouslySetInnerHTML={{
                                __html: data.userDetails_emp?.company_information?.profile,
                            }}
                        />


                        <br />
                        <h3><strong>Contact</strong></h3>

                        {data.email}
                        <br />
                        {data.userDetails_emp.company_information.phone}
                    </div>
                </div>
            </div>
        </>
    )
}