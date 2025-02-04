const CompanyModel = require("../modules/CompanyModel");


module.exports.CompanyController = async(req,res) =>{
    try{
        const {name,address,website} = req.body;

        const newCompany = await CompanyModel.create({
            name,
            address,
            website
        })
       
        res.status(201).json({
            success:true,
            message:"Company Created Successfully",
            data:newCompany
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error Company Creation",
            error:error.message
        })
    }
}

module.exports.GetCompanyController = async(req,res) =>{
  try {
    const companyData =await CompanyModel.find({});

    res.status(201).json({
        success:true,
        message:"All Company List",
        data:companyData
    });
  } catch (error) {
    res.status(500).json({
        success:false,
        message:"Error fetching User",
        error:error.message
    })
  }
  
  
  
}

module.exports.GetOneCompanyController = async(req,res) =>{
    const {id} = req.params;

    const OneCompany = await CompanyModel.findById(id);

    res.status(201).json({
        success:true,
        message:"fetch one Company data",
        data:OneCompany
    })
}