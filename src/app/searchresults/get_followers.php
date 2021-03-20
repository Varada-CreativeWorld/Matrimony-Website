<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'config/connection.php';
//include_once 'class/register.php';
 
$database = new Connection();
$db = $database->getConnection();
 
//$items = new register($db);
 
$data = json_decode(file_get_contents("php://input"));

//if(!empty($data->profileid) && !empty($data->education) && !empty($data->occupation) && !empty($data->income) ){    

    $item1 = $data->profileid;
    $itemRecords=array();
    
        $stmt = $db->prepare("
        SELECT * FROM req_send JOIN profile_img ON req_send.receiver_id=profile_img.profileid JOIN register ON register.profileid=profile_img.profileid
        WHERE sender_id=? AND receiver_id=(SELECT sender_id FROM req_send WHERE receiver_id=? AND status='Accepted' AND sender_id != ?) 
        AND profile_img.privacy='Profile'");        
        
            $stmt->bind_param('sss',$item1,$item1,$item1);
        
            $stmt->execute();
            
            $result = $stmt->get_result();
            if($result->num_rows > 0){ 

                //$itemRecords["preference"]=array(); 
                while ($item = $result->fetch_assoc()) { 	
                    extract($item); 
                    $itemDetails=array("rprofileid" => $receiver_id,
                                        "name" => $name,
                                        "image" => $image);
                    array_push($itemRecords, $itemDetails); 
                }
                
                
            }
            echo json_encode($itemRecords);
          
   

?>