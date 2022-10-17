var serialResult = '';
var serialResultScale = '';

function pushSerial(scan, com, manufacturer){
    // var temp = val.split('\r\n');
    serialResult = {scan: scan, com: com, manufacturer: manufacturer}    
    return serialResult;
}

function getSerial(){
    return serialResult;
}

function clearSerial(){
    serialResult = '';
}

function pushSerialScale(scan, com, manufacturer){
    serialResultScale = {scan: scan, com: com, manufacturer: manufacturer}    
    return serialResultScale;
}

function getSerialScale(){
    return serialResultScale;
}

function clearSerialScale(){
    serialResultScale = '';
}
