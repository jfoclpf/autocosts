//function that returns a string representing a number 
//always with the same fixed decimal characters
function fixNmbr(i,n){
    if (typeof i === 'number')
        return i.toFixed(n);
    else{
        var num=parseFloat(i);
        return num.toFixed(n);
    }
}

function print_table(country){
    //blockTable
    $('#blocker').show();
    var width = $('#div13').width();
    var height = $('#div13').height();
    $('#blocker').height(height).width(width);

    $.ajax({
        url: 'db_stats/GetData.php',
        type: "POST",
        data: ({country_code: country}),
        dataType: "json",		
        success: function(avarage_data) {
            //alert("country: "+country);
            //alert(JSON.stringify(avarage_data, null, 4));
            if(avarage_data){
                $('#txt_depr').html(fixNmbr(avarage_data.Depreciation,1));
                $('#txt_ins').html(fixNmbr(avarage_data.Insurance,1));
                $('#txt_cred').html(fixNmbr(avarage_data.Loan_interests,1));
                $('#txt_insp').html(fixNmbr(avarage_data.Inspection,1));
                $('#txt_tax').html(fixNmbr(avarage_data.Car_tax,1));
                $('#txt_standing_costs').html(avarage_data.standing_costs);
                
                $('#txt_fuel').html(fixNmbr(avarage_data.Fuel,1));
                $('#txt_maint1, #txt_maint2').html(fixNmbr((avarage_data.Maintenance)/2,1));
                $('#txt_rep').html(fixNmbr(avarage_data.Repairs,1));
                $('#txt_park').html(fixNmbr(avarage_data.Parking,1));
                $('#txt_tolls').html(fixNmbr(avarage_data.Tolls,1));
                $('#txt_fines').html(fixNmbr(avarage_data.Fines,1));
                $('#txt_wash').html(fixNmbr(avarage_data.Washing,1));
                $('#txt_running_costs').html(avarage_data.running_costs);
                
                $('#txt_total_overal').html(avarage_data.total_costs);
                
                $('#txt_running_costs_dist').html(fixNmbr(avarage_data.running_costs_dist,2));
                $('#txt_total_costs_p_unit').html(fixNmbr(avarage_data.total_costs_dist,2));
                $('#txt_kinetic_speed').html(avarage_data.kinetic_speed);
                $('#txt_virtual_speed').html(avarage_data.virtual_speed);
                $('#txt_total_costs_year').html(avarage_data.total_costs_year);
                $('#users_counter').html(avarage_data.users_counter);
            }
            else{
                $('.value-field').html('0.0');
                $('#users_counter').html(0);
            }
            
            $('#blocker').hide();
        },
        error: function () {					
            console.log("There was an error submitting the values for statistical analysis");
        }
    });
}