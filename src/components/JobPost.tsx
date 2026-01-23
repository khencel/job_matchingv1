import Link from "next/link";

export default function JobPost({data}: {data: any[]}) {
    // TODO: Fetch and display job postings here
  return (
    <div className="container py-4">
        <div className="row justify-content-center wow animate__animated animate__fadeInUp">
            <div className="col-md-10">
                <div className="row justify-content-center">

                    {
                        data.map((item: any, index: number) => {
                            return (
                                <div className="col-md-3 p-2" key={index}>
                                    <div className="card rounded-4 shadow" style={{ maxWidth: '400px' }}>
                                        <img 
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" 
                                            className="card-img-top" 
                                            alt="Person working on laptop"
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <h2 className="card-title h5                                                                                     n                                                                                               fw-bold mb-2">{item.title}</h2>
                                            <p className="text-muted mb-3">Cecil Grocery Incorporated</p>
                                            <p className="card-text clamp-3" dangerouslySetInnerHTML={{ __html: item.job_desc }}>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <button className="btn btn-primary-custom">
                            <Link href="/find-jobs" className="text-white text-decoration-none">View More Jobs</Link>
                        </button>
                    </div>
                </div>
            </div>
          </div>
      </div>
      
  );
}
