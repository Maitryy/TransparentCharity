pragma solidity ^0.8.0;

contract Charity{
    struct unverifiedRequest
    {
        uint id;
        address owner;
        string title;
        uint amount;
        bytes descriptionHash;
        bytes docHash;
        uint upvote;
        uint downvote;
    }
    struct verifiedRequest
    {
        uint id;
        address payable owner;
        string title;
        uint amount;
        bytes descriptionHash;
        bytes docHash;
        uint amountRaised;

    }
    address admin;
    address payable[] public verifiers;
    // mapping(uint =>unverifiedRequest ) unverifiedRequests;
    // mapping(uint =>verifiedRequest ) verifiedRequests;
    unverifiedRequest[] public unverifiedRequests;
    verifiedRequest[] public verifiedRequests;
    mapping( address => mapping( uint => bool ) ) public voteStatus;


    constructor()  
    {
        admin = msg.sender;
    }

    modifier isAdmin {
        require(
            admin == msg.sender,
            "Only admin is allowed to operate this functionality"
        );
        _;
    }

   
    modifier isVerifier {
        bool flag=false;
        for(uint i=0;i<verifiers.length;i++)
        {
            if(verifiers[i]==msg.sender)
            {
                flag=true;
                break;
            }  
        }
         require(
            flag==true,
            "Only verifier is allowed to operate this functionality"
        );
        _;
        
    }

    function addVerifier(address payable verifier) public isAdmin returns(bool){

        for(uint i=0;i<verifiers.length;i++)
        {
            if(verifiers[i]==verifier)
                revert("Verifier already exists");
        }
        verifiers.push(verifier);
        return true;

    }
    function removeVerifier(address verifier) public isAdmin returns(bool){

        uint ind=1000000;
        for(uint i=0;i<verifiers.length;i++)
        {
            if(verifiers[i]==verifier)
            {
                ind=i;
                break;
            }
        }
        if(ind==1000000)
            revert("Verifier not present");
        verifiers[ind]=verifiers[verifiers.length-1];
        verifiers.pop();
        return true;

    }

    function addRequest( uint id,string memory title,uint amount,bytes memory descriptionHash,bytes memory docHash) public returns(bool){
        unverifiedRequests.push(unverifiedRequest({
            id:id,
            title:title,
            amount:amount,
            descriptionHash:descriptionHash,
            docHash:docHash,
            owner:msg.sender,
            upvote:0,
            downvote:0
        }));
        return true;
    }

    function upvoteRequest(uint id) public isVerifier returns(bool){
        
        uint ind=1000000;
        for(uint i=0;i<unverifiedRequests.length;i++)
        {
            if(unverifiedRequests[i].id==id)
            {
                ind=i;
                break;
            }
        }   
        if(ind==1000000)
            revert("Request not found");
        require(voteStatus[msg.sender][id]==false,"Already voted");
        voteStatus[msg.sender][id]=true;
        unverifiedRequests[ind].upvote+=1;
        if(unverifiedRequests[ind].upvote>verifiers.length/2)
            verifyRequest(ind);
        return true;


    }

    function downvoteRequest(uint id) public isVerifier returns(bool){
        uint ind=1000000;
        for(uint i=0;i<unverifiedRequests.length;i++)
        {
            if(unverifiedRequests[i].id==id)
            {
                ind=i;
                break;
            }
        }   
        if(ind==1000000)
            revert("Request not found");
        require(voteStatus[msg.sender][id]==false,"Already voted");
        voteStatus[msg.sender][id]=true;
        unverifiedRequests[ind].downvote+=1;
        if(unverifiedRequests[ind].downvote>=verifiers.length/2)
            unverifyRequest(ind);
        return true;

    }

    function verifyRequest(uint ind) internal {
        verifiedRequests.push(verifiedRequest({
            id:unverifiedRequests[ind].id,
            title:unverifiedRequests[ind].title,
            amount:unverifiedRequests[ind].amount,
            descriptionHash:unverifiedRequests[ind].descriptionHash,
            docHash:unverifiedRequests[ind].docHash,
            owner:payable(unverifiedRequests[ind].owner),
            amountRaised:0
        }));
        uint id=unverifiedRequests[ind].id;
        unverifiedRequests[ind]=unverifiedRequests[unverifiedRequests.length-1];
        unverifiedRequests.pop();
        for(uint i=0;i<verifiers.length;i++)
            delete voteStatus[verifiers[i]][id];
        return;

    }

    function unverifyRequest(uint ind) internal {
        uint id=unverifiedRequests[ind].id;
        unverifiedRequests[ind]=unverifiedRequests[unverifiedRequests.length-1];
        unverifiedRequests.pop();
        for(uint i=0;i<verifiers.length;i++)
            delete voteStatus[verifiers[i]][id];
        return;

    }

    function donate(uint id) public payable returns(bool){
        uint ind=1000000;
        for(uint i=0;i<verifiedRequests.length;i++)
        {
            if(verifiedRequests[i].id==id)
            {
                ind=i;
                break;
            }
        }   
        if(ind==1000000)
            revert("Request not found");
        uint beneficiaryAmount=(99*msg.value)/100; 
        uint verifierAmount = msg.value/100;

        (bool sent, bytes memory dat) =  verifiedRequests[ind].owner.call{value: beneficiaryAmount}("");
        delete dat;
        require(sent, "Failed to send Ether to beneficiary");
        for(uint i=0;i<verifiers.length;i++)
        {
             (bool sent2, bytes memory dat2) =  verifiers[i].call{value: verifierAmount/verifiers.length}("");
            delete dat2;
            require(sent2, "Failed to send Ether to verifier");
        }
        verifiedRequests[ind].amountRaised+=msg.value;
        if(verifiedRequests[ind].amountRaised>=verifiedRequests[ind].amount)
            deleteRequest( ind);
        return true;

    }

    function deleteRequest(uint ind) internal {
        verifiedRequests[ind]=verifiedRequests[verifiedRequests.length-1];
        verifiedRequests.pop();
        return;

    }

}