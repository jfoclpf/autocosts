function print_table(country){
    //blockTable
    $('#blocker').show();
    var width = $('#div13').width();
    var height = $('#div13').height();
    $('#blocker').height(height).width(width);

    $.ajax({
        url: 'db_stats/GetData.php',
        data: "",
        dataType: "json",		
        success: function(result) {
            //alert(JSON.stringify(result, null, 4));
            var avarage_data = [];				
            //get data
            $.each(result, function(i, item){
                if(item.country==country){
                    avarage_data=item;
                }
            })
            //alert("country: "+country);
            //alert(JSON.stringify(avarage_data, null, 4));
            
            if(avarage_data){
                $('#txt_depr').html(avarage_data.Depreciation);
                $('#txt_ins').html(avarage_data.Insurance);
                $('#txt_cred').html(avarage_data.Loan_interests);
                $('#txt_insp').html(avarage_data.Inspection);
                $('#txt_tax').html(avarage_data.Car_tax);
                $('#txt_standing_costs').html(avarage_data.standing_costs);
                $('#txt_fuel').html(avarage_data.Fuel);
                $('#txt_maint1, #txt_maint2').html((avarage_data.Maintenance)/2);
                $('#txt_rep').html(avarage_data.Repairs);
                $('#txt_park').html(avarage_data.Parking);
                $('#txt_tolls').html(avarage_data.Tolls);
                $('#txt_fines').html(avarage_data.Fines);
                $('#txt_wash').html(avarage_data.Washing);
                $('#txt_running_costs').html(avarage_data.running_costs);
                $('#txt_total_overal').html(avarage_data.total_costs);
                $('#txt_running_costs_dist').html(avarage_data.running_costs_dist);
                $('#txt_total_costs_p_unit').html(avarage_data.total_costs_dist);
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