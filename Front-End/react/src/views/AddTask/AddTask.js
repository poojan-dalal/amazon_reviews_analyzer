import React ,{ useState } from 'react';
import axios from 'axios';
import './main.css'
const AddTask = () => {
 const [url,setUrl]=useState('');
 const [start,setStart]=useState('');
 const [end,setEnd]=useState('');
 const [name,setName]=useState('')
    return (
        <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
            <div className="card card-5">
                <div className="card-heading">
                    <h2 className="title">Amazon Product comment Analyzer</h2>
                </div>
                <div className="card-body">
                    <form >
                    <div className="form-row">
                            <div className="name">Name of product</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" name="url" onChange={(e)=>{setName(e.target.value)}} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">URL of product</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" name="url" onChange={(e)=>{setUrl(e.target.value)}} />
                                </div>
                            </div>
                        </div>
                         
                       
                        <div class="form-row m-b-55">
                            <div class="name">Page Range.</div>
                            <div class="value">
                                <div class="row row-refine">
                                    <div class="col-3">
                                        <div class="input-group-desc">
                                            <input class="input--style-5" type="number" name="start_page"  onChange={(e)=>{setStart(e.target.value)}}/>
                                            <label class="label--desc">Start Page </label>
                                        </div>
                                    </div>
                                    
                                    <div class="col-3">
                                        <div class="input-group-desc">
                                            <input class="input--style-5" type="number" name="end_page" onChange={(e)=>{setEnd(e.target.value)}}/>
                                            <label class="label--desc">End Page </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div>
                            <button class="btn btn--radius-2 btn--red" type="submit" onClick={(e)=>{
                               e.preventDefault();
                               if((end-start)>5){
                                    alert('Please enter only 5 pages')
                                }else if(start<0 || end<0 ){
                                   alert('Enter Postive page number');
                                }
                                else{
                                    console.log(name,url,start,end)
                                    axios.post('http://127.0.0.1:5000/books',{
                                        name:name,
                                        url:url,
                                        sgpage:start,
                                        epage:end
                                    }).then( (response) =>{
                                        console.log(response);
                                      })
                                    
                                }
                            }}>Analyze</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

  );
};

export default AddTask;
