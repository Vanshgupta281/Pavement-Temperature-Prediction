// State.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Select, Checkbox, Dropdown, Space, Button, Input } from 'antd';
import Plot from 'react-plotly.js';
import axios from 'axios';
import './state.css'; 

const districtData = {
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool", "Kakinada", "Kadapa", "Anantapur",
    "Rajahmundry", "Eluru", "Ongole", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Proddatur", "Chittoor", "Hindupur",
    "Bhimavaram", "Madanapalle", "Gudur", "Srikakulam", "Bapatla", "Narasaraopet"
  ],
  "Arunachal Pradesh": [
    "Itanagar", "Tawang", "Naharlagun", "Pasighat", "Roing", "Ziro", "Tezu", "Bomdila", "Along",
    "Anini", "Aalo", "Changlang", "Daporijo", "Seppa", "Khonsa", "Yingkiong", "Dirang", "Namsai", "Mechuka",
    "Longding", "Bomdila", "Hayuliang", "Miao", "Naharlagun", "Tuting"
  ],
  "Assam": [
    "Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Nagaon", "Tinsukia", "Tezpur", "Karimganj", "Bongaigaon",
    "Sivasagar", "Nalbari", "Dhubri", "Goalpara", "Barpeta", "Jorhat", "Kokrajhar", "Diphu", "North Lakhimpur",
    "Dhemaji", "Lanka", "Hailakandi", "Morigaon", "Sonari", "Golaghat", "Baksa", "Biswanath Chariali"
  ],
  "Bihar": [
    "Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Purnia", "Darbhanga", "Arrah", "Begusarai", "Katihar", "Bihar Sharif",
    "Munger", "Chhapra", "Danapur", "Saharsa", "Sasaram", "Hajipur", "Dehri", "Siwan", "Motihari", "Nawada",
    "Bagaha", "Buxar", "Kishanganj", "Sitamarhi", "Jamalpur"
  ],
  "Chhattisgarh": [
    "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Raigarh", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Mahasamund",
    "Dhamtari", "Chirmiri", "Kawardha", "Sakti", "Dalli-Rajhara", "Jagdalpur", "Naila Janjgir", "Tilda Newra", "Kondagaon",
    "Dongargarh", "Bemetara", "Mungeli", "Tilda Newra", "Baloda Bazar", "Balod"
  ],
  "Goa": [
    "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Cuncolim", "Madgaon", "Quepem",
    "Sanguem", "Sanquelim", "Valpoi", "Calangute", "Canacona", "Chaudi", "Marcela", "Morjim", "Old Goa", "Panaji",
    "Pernem", "Salcete", "Tiswadi", "Sattari", "Bardez"
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Nadiad",
    "Bharuch", "Porbandar", "Morbi", "Surendranagar", "Gandhidham", "Veraval", "Navsari", "Valsad", "Vapi",
    "Bhuj", "Ankleshwar", "Godhra", "Patan", "Dahod", "Palanpur"
  ],
  "Haryana": [
    "Faridabad", "Gurgaon", "Hisar", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Karnal", "Sonipat", "Panchkula",
    "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Palwal", "Ambala Sadar", "Fatehabad",
    "Jagadhri", "Pinjore", "Kurukshetra", "Tohana", "Charkhi Dadri"
  ],
  "Himachal Pradesh": [
    "Shimla", "Mandi", "Dharamshala", "Solan", "Nahan", "Una", "Palampur", "Bilaspur", "Chamba", "Hamirpur",
    "Kullu", "Manali", "Kinnaur", "Lahaul and Spiti", "Sirmaur", "Kangra", "Rampur", "Paonta Sahib", "Baddi",
    "Nalagarh", "Nurpur", "Jogindernagar", "Mandi", "Sarkaghat", "Jogindernagar"
  ],
  "Jammu and Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Rajouri", "Udhampur", "Sopore", "Pulwama", "Kupwara",
    "Hiranagar", "Kulgam", "Bandipora", "Doda", "Poonch", "Ramban", "Reasi", "Shopian", "Kargil", "Leh",
    "Kishtwar", "Samba", "Ganderbal", "Pulwama", "Gulmarg"
  ],
  "Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Dumka", "Chaibasa",
    "Jamtara", "Latehar", "Lohardaga", "Pakur", "Garhwa", "Godda", "Sahebganj", "Simdega", "Chatra", "Koderma",
    "Gumla", "Khunti", "Palamu", "Saraikela", "Jamua", "Khunti", "Daltonganj", "Ghatshila", "Bermo", "Chandil"
  ],
  "Karnataka": [
    "Bengaluru", "Mysuru", "Hubballi", "Belagavi", "Mangaluru", "Davanagere", "Ballari", "Vijayapura", "Kalaburagi", "Shivamogga",
    "Tumakuru", "Raichur", "Bidar", "Hospet", "Gadag-Betageri", "Hassan", "Udupi", "Bellary", "Dharwad", "Bengaluru Rural",
    "Bagalkot", "Chikkamagaluru", "Chitradurga", "Kolar", "Koppal", "Ramanagara", "Chikkaballapura", "Gadag", "Channapatna", "Kundapura"
  ],
  "Kerala": [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Kasaragod",
    "Malappuram", "Pathanamthitta", "Idukki", "Wayanad", "Ernakulam", "Palakkad", "Kollam", "Alappuzha", "Thrissur", "Kasaragod",
    "Kottayam", "Malappuram", "Pathanamthitta", "Kollam", "Kasaragod", "Thalassery", "Ponnani", "Perinthalmanna", "Kanhangad", "Tirur"
  ],
  "Madhya Pradesh": [
    "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa",
    "Chhindwara", "Morena", "Bhind", "Guna", "Shivpuri", "Vidisha", "Damoh", "Mandsaur", "Khargone", "Neemuch",
    "Pithampur", "Itarsi", "Singrauli", "Hoshangabad", "Sehore", "Harda", "Datia", "Betul", "Seoni", "Nagda"
  ],
  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati", "Nanded", "Kolhapur",
    "Sangli", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Raigad", "Palghar", "Satara", "Bid", "Chandrapur",
    "Buldana", "Gondia", "Hingoli", "Jalna", "Wardha", "Osmanabad", "Parbhani", "Nandurbar", "Yavatmal", "Washim",
    "Bhandara", "Ratnagiri", "Sindhudurg", "Gadchiroli", "Beed"
  ],
  "Manipur": [
    "Imphal", "Thoubal", "Churachandpur", "Bishnupur", "Senapati", "Chandel", "Tamenglong", "Ukhrul", "Jiribam", "Kakching",
    "Kangpokpi", "Noney", "Pherzawl", "Tengnoupal", "Kamjong", "Noney", "Kangpokpi", "Kakching", "Tengnoupal", "Kamjong"
  ],
  "Meghalaya": [
    "Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar", "Baghmara", "Nongstoin", "Resubelpara", "Mawlai", "Cherrapunji",
    "Shillong Cantonment", "Nongpoh", "Nongthymmai", "Nongmynsong", "Shella Bholaganj", "Mairang", "Jawai", "Tura", "Baghmara", "Nongstoin"
  ],
  "Mizoram": [
    "Aizawl", "Lunglei", "Champhai", "Saiha", "Serchhip", "Kolasib", "Lawngtlai", "Mamit", "Saitual", "Khawzawl",
    "Thenzawl", "Hnahthial", "Thingsulthliah", "Kawrthah", "Aibawk", "Phullen", "Biate", "Darlawn", "Zawlnuam", "Sairang"
  ],
  "Nagaland": [
    "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon", "Kiphire", "Longleng",
    "Peren", "Noklak", "Chümoukedima", "Pfutsero", "Tseminyu", "Changtongya", "Shamator", "Aboi", "Meluri", "Pungro"
  ],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Brahmapur", "Baripada", "Bhadrak",
    "Bargarh", "Angul", "Jharsuguda", "Bhawanipatna", "Jeypore", "Kendujhar", "Paradip", "Rayagada", "Dhenkanal", "Sunabeda"
  ],
  "Punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Pathankot", "Moga", "Firozpur",
    "Kapurthala", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Gurdaspur", "Sangrur", "Faridkot", "Batala", "Fazilka",
    "Khanna", "Ropar", "Abohar", "Malout", "Nabha", "Patti", "Giddarbaha", "Samana", "Sunam", "Tarn Taran",
    "Nakodar", "Dhuri", "Zirakpur", "Mansa", "Malerkotla", "Barnala"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Pali",
    "Sri Ganganagar", "Bharatpur", "Banswara", "Barmer", "Dausa", "Chittorgarh", "Churu", "Jhunjhunu", "Hanumangarh",
    "Dungarpur", "Nagaur", "Rajsamand", "Tonk", "Jaisalmer", "Sawai Madhopur", "Bundi", "Jhalawar", "Sirohi", "Sikar",
    "Karauli", "Baran", "Pratapgarh", "Dholpur", "Bhilwara", "Jalore", "Ajmer"
  ],
  "Sikkim": [
    "Gangtok", "Namchi", "Mangan", "Singtam", "Gyalshing", "Ravangla", "Rangpo", "Nayabazar", "Rhenock", "Jorethang",
    "Rongli", "Lachung", "Lachen", "Chungthang", "Dzongu", "Pakyong", "Majitar", "Melli", "Soreng", "Pelling",
    "Sombari", "Sajong", "Lingtam", "Yumthang", "Yumthang Valley", "Hee Bermiok", "Mangan", "Namchi", "Pakyong", "Rinchenpong"
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukudi",
    "Dindigul", "Thanjavur", "Tiruvannamalai", "Nagercoil", "Kancheepuram", "Kumbakonam", "Rajapalayam", "Pudukkottai", "Hosur", "Krishnagiri",
    "Sivakasi", "Karur", "Sivaganga", "Ramanathapuram", "Virudhunagar", "Cuddalore", "Ambur", "Mayiladuthurai", "Sankarankovil", "Tirupathur"
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Siddipet",
    "Miryalaguda", "Kollapur", "Narayanpet", "Zahirabad", "Jagtial", "Sangareddy", "Vikarabad", "Bodhan", "Jangaon", "Bhongir",
    "Wanaparthy", "Nirmal", "Kamareddy", "Mancherial", "Tandur", "Bellampalli", "Mahabubabad", "Jagitial", "Huzurabad", "Kothagudem"
  ],
  "Tripura": [
    "Agartala", "Udaipur", "Dharmanagar", "Pratapgarh", "Belonia", "Kailasahar", "Ambassa", "Khowai", "Teliamura", "Sonamura",
    "Sabroom", "Kamalpur", "Kumarghat", "Mohanpur", "Amarpur", "Ranirbazar", "Bishalgarh", "Jirania", "Melaghar", "Matabari",
    "Bishramganj", "Kakraban", "Manu", "Jolaibari", "Hrishyamukh", "Boxanagar", "Killa", "Gournagar", "Rajnagar", "Rupaichhari"
  ],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Meerut", "Bareilly", "Aligarh", "Moradabad", "Saharanpur",
    "Gorakhpur", "Faizabad", "Jhansi", "Muzaffarnagar", "Mathura", "Ghaziabad", "Sultanpur", "Azamgarh", "Firozabad",
    "Sambhal", "Shahjahanpur", "Rampur", "Hardoi", "Amroha", "Farrukhabad", "Hapur", "Etawah", "Bulandshahr", "Lakhimpur Kheri",
    "Sitapur", "Bahraich", "Rae Bareli", "Modinagar", "Unnao", "Mau", "Jaunpur", "Etah"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Rishikesh", "Nainital", "Mussoorie", "Roorkee", "Haldwani", "Kashipur", "Rudrapur", "Pauri",
    "Tehri", "Pithoragarh", "Almora", "Udham Singh Nagar", "Chamoli", "Champawat", "Bageshwar", "Uttarkashi", "Chakrata",
    "Kotdwara", "Joshimath", "Badrinath", "Kedarnath", "Gangotri", "Yamunotri"
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur",
    "Krishnanagar", "Medinipur", "Raiganj", "Bally", "Serampore", "Rampurhat", "Haldia", "Jalpaiguri", "Balurghat", "Bankura",
    "Nabadwip", "Purulia", "Barasat", "Basirhat", "Cooch Behar", "Alipurduar", "Kandi", "Midnapore", "Darjeeling", "Bangaon"
  ],
};

const State = () => {
  const { stateName } = useParams();
  const [currentState, setCurrentState] = useState(stateName);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); // Track selected city
  const [selectedModels, setSelectedModels] = useState(['model1', 'model2', 'model3','model4', 'model5', 'model6', 'model7']);
  const [modelsOpen, setModelsOpen] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState({ time: [], pavementTemperatures: [] }); // Store pavement temperatures
  const [plotting, setPlotting] = useState(false);
  const [latitude, setLatitude] = useState(''); // State variable for latitude
const [longitude, setLongitude] = useState('');
const { Option } = Select;
  const modelsOptions = [
    { label: "Jing Chao's model", value: 'model1' },
    { label: 'Model 2', value: 'model2' },
    { label: 'Model 3', value: 'model3' },
    { label: 'Model 4', value: 'model4' },
    { label: 'Model 5', value: 'model5' },
    { label: 'Model 6', value: 'model6' },
    { label: 'Model 7', value: 'model7' },

  ];

  useEffect(() => {
    setDistricts(districtData[currentState] || []);
  }, [currentState]);

  const handleStateChange = (value) => {
    setCurrentState(value);
    setShowGraph(false);
  };
  
  const handleSubmit = async () => {
    try {
      if (selectedCity) {
        // If district is selected, use handleDistrictChange
        await handleDistrictChange(selectedCity);
      } else {
        // If not, use latitude and longitude
        console.log(latitude);
        console.log(longitude);
        const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=yDA1NaQZuSDOrJBJURv69wYOOBfdkkxI&q=${latitude},${longitude}`);
        const location = response.data.Key;
     
        console.log(location)
        const hourlyForecastResponse = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location}?apikey=yDA1NaQZuSDOrJBJURv69wYOOBfdkkxI&details=true`);
  
        const hourlyData = hourlyForecastResponse.data.map(hourData => {
          const temperature = hourData.Temperature ? hourData.Temperature.Value : 0;
          const indoorRelativeHumidity = hourData.IndoorRelativeHumidity ? hourData.IndoorRelativeHumidity : 0;
          const cloudCover = hourData.CloudCover != null ? hourData.CloudCover : 0;
          const rainValue = hourData.Rain ? hourData.Rain.Value : 0;
          const windSpeed = hourData.Wind && hourData.Wind.Speed ? hourData.Wind.Speed.Value : 0;
          const SolarIrradiance = hourData.SolarIrradiance ? hourData.SolarIrradiance.Value : 0;
  
          const pavementTemperature = selectedModels.map(model => {
            let pavementTemperature;
            switch (model) {
              case 'model1':
                pavementTemperature = 12.25 + 0.36 * (temperature * 5 / 9 - 17.78) + 0.0317 * cloudCover - 0.0004 * indoorRelativeHumidity + 0.24 * 0.44704 * windSpeed - 0.08 * rainValue;
                break;
              case 'model2':
                pavementTemperature=-0.698+0.687*(temperature * 5 / 9 - 17.78)+0.64*(10.813-0.00919*indoorRelativeHumidity);
                break;
              case 'model3':
                pavementTemperature=0.5*(((temperature * 5 / 9 - 17.78)-0.00618*latitude*latitude+0.2289*latitude+24.4+17.8)*0.9545-17.8+0.859*(temperature * 5 / 9 - 17.78)+1.7+0.9948);
                break;
              case 'model4':
                pavementTemperature=-0.7147+1.3023*(temperature * 5 / 9 - 17.78)+0.1103*latitude;
                break;
              case 'model5':
                pavementTemperature=1.118*(temperature*5/9-17.78)+3.64;
                break;
              case 'model6':
                pavementTemperature=3.16+1.139*(temperature*5/9-17.78);
                break;
              case 'model7':
                pavementTemperature=3.422+1.006*(temperature * 5 / 9 - 17.78);
                break;
              default:
                pavementTemperature = 0;
            }
            return pavementTemperature;
          });
          console.log(pavementTemperature);
  
          return {
            DateTime: hourData.DateTime,
            PavementTemperature: pavementTemperature,
            airTemperature: temperature*5/9-17.78,
          };
        });
        const time = hourlyData.map(data => data.DateTime);
        const airTemperatures = hourlyData.map(data => data.airTemperature);
        const pavementTemperatures = selectedModels.map((_, index) => {
          return {
            name: `Model ${index + 1}`,
            data: hourlyData.map(data => data.PavementTemperature[index]),
          };
        });
        console.log(pavementTemperatures)
  
        setGraphData({ time, airTemperatures, pavementTemperatures});
        setShowGraph(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  
  const handleDistrictChange = async (value) => {
    // setSelectedCity(value);
    console.log(`Fetching location data for ${value}...`);
    try {
      const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=yDA1NaQZuSDOrJBJURv69wYOOBfdkkxI&q=${value}`);
      console.log('Location data fetched successfully:', response.data[0].Key);

      const locationKey = response.data[0].Key;
      const latitude = response.data[0].GeoPosition.Latitude;
      const hourlyForecastResponse = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=yDA1NaQZuSDOrJBJURv69wYOOBfdkkxI&details=true`);

      const hourlyData = hourlyForecastResponse.data.map(hourData => {
        const temperature = hourData.Temperature ? hourData.Temperature.Value : 0;
        const indoorRelativeHumidity = hourData.IndoorRelativeHumidity ? hourData.IndoorRelativeHumidity : 0;
        const cloudCover = hourData.CloudCover != null ? hourData.CloudCover : 0;
        const rainValue = hourData.Rain ? hourData.Rain.Value : 0;
        const windSpeed = hourData.Wind && hourData.Wind.Speed ? hourData.Wind.Speed.Value : 0;
        const SolarIrradiance = hourData.SolarIrradiance ? hourData.SolarIrradiance.Value : 0;

        const pavementTemperature = selectedModels.map(model => {
                    let pavementTemperature;
                    switch (model) {
                      case 'model1':
                    pavementTemperature = 12.25 + 0.36 * (temperature * 5 / 9 - 17.78) + 0.0317 * cloudCover - 0.0004 * indoorRelativeHumidity + 0.24 * 0.44704 * windSpeed - 0.08 * rainValue;
                        break;
                      case 'model2':
                        
                        pavementTemperature=-0.698+0.687*(temperature * 5 / 9 - 17.78)+0.64*(10.813-0.00919*indoorRelativeHumidity);
                        break;
                      case 'model3':
                        pavementTemperature=0.5*(((temperature * 5 / 9 - 17.78)-0.00618*latitude*latitude+0.2289*latitude+24.4+17.8)*0.9545-17.8+0.859*(temperature * 5 / 9 - 17.78)+1.7+0.9948);
                        break;
                        case 'model4':
                          pavementTemperature=-0.7147+1.3023*(temperature * 5 / 9 - 17.78)+0.1103*latitude;
                        break;
                        case 'model5':
                          pavementTemperature=1.118*(temperature*5/9-17.78)+3.64;
                          break;
                          case 'model6':
                            pavementTemperature=3.16+1.139*(temperature*5/9-17.78);
                            break;
                            case 'model7':
                            pavementTemperature=3.422+1.006*(temperature * 5 / 9 - 17.78);
                            break;
                      default:
                        pavementTemperature = 0;
                    }
                    return pavementTemperature;
                  });
                  console.log(pavementTemperature);

        return {
          DateTime: hourData.DateTime,
          PavementTemperature: pavementTemperature,
          airTemperature: temperature*5/9-17.78,
        };
      });
      const time = hourlyData.map(data => data.DateTime);
      const airTemperatures = hourlyData.map(data => data.airTemperature);
      const pavementTemperatures = selectedModels.map((_, index) => {
                return {
                  name: `Model ${index + 1}`,
                  data: hourlyData.map(data => data.PavementTemperature[index]),
                };
              });
              console.log(pavementTemperatures)

      setGraphData({ time, airTemperatures, pavementTemperatures});
      setShowGraph(true);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  // const handleModelChange = (model) => {
  //   const index = selectedModels.indexOf(model);
  //   if (index === -1) {
  //     setSelectedModels([...selectedModels, model]);
  //   } else {
  //     const updatedModels = [...selectedModels];
  //     updatedModels.splice(index, 1);
  //     setSelectedModels(updatedModels);
  //   }
  //   console.log(selectedModels[selectedModels.length - 1]);
  // }; 

  const handleModelsDropdown = () => {
    setModelsOpen(!modelsOpen);
  };
  const handlePlotButtonClick = () => {
    setShowGraph(!showGraph);
  };  

  return (
    <div className="state-container">
      <h2 className="state-title">{currentState}<br/></h2>
      <h4 className="other-locations-text">For Other Locations, Enter Latitude and Longitude</h4>
      <div className="select-container">
        <Select
          className="state-select"
          placeholder="Select State"
          value={currentState}
          onChange={handleStateChange}
        >
          {Object.keys(districtData).map((state, index) => (
            <Option key={index} value={state}>{state}</Option>
          ))}
        </Select>
        <Select
  className="district-select"
  placeholder="Select District"
  onChange={(value) => setSelectedCity(value)}
>
  {districts.map((district, index) => (
    <Option key={index} value={district}>{district}</Option>
  ))}
</Select>

        <Input
        style={{ height: '30px', width: '200px' }}
          className="latitude-input" // Add className for styling
          placeholder="Latitude" // Placeholder text for latitude input
          value={latitude} // Bind value to state variable
          onChange={handleLatitudeChange} // Handle input change
        />
        <Input
        style={{ height: '30px', width: '200px' }}
          className="longitude-input" // Add className for styling
          placeholder="Longitude" // Placeholder text for longitude input
          value={longitude} // Bind value to state variable
          onChange={handleLongitudeChange} // Handle input change
        />
         <button style={{ height: '30px', width: '150px' }} onClick={handleSubmit}>Submit</button>
        {/* <Select
           className="models-select"
           mode="multiple"
           placeholder="Select Models"
           defaultValue={[]}
           onChange={handleModelChange}
           onDropdownVisibleChange={handleModelsDropdown}
           style={{ width: modelsOpen ? 300 : 200 }}
        >           
          {modelsOptions.map((model, index) => (
          <Option key={index} value={model.value}>{model.label}</Option>
           ))}
         </Select> */}
         {/* <Button onClick={handlePlotButtonClick}>
          {showGraph ? 'Change Models' : 'Plot'}
        </Button> */}
      </div>
      
      {showGraph && (
        <div className="graph-container">
         <Plot
  data={[
    {
      x: graphData.time,
      y: graphData.pavementTemperatures[0].data,
      type: 'scatter',
      mode: 'lines+markers',
      name: `Pavement Temperature selected model 1`,
      marker: { color: 'blue' },
    },
    {
      x: graphData.time,
      y: graphData.pavementTemperatures[1].data,
      type: 'scatter',
      mode: 'lines+markers',
      name: `Pavement Temperature selected model 2`,
      marker: { color: 'green' },
    },
    {
      x: graphData.time,
      y: graphData.pavementTemperatures[2].data,
      type: 'scatter',
      mode: 'lines+markers',
      name: `Pavement Temperature selected model 3`,
      marker: { color: 'yellow' },
    },
    {
      x: graphData.time,
      y: graphData.pavementTemperatures[3].data,
      type: 'scatter',
      mode: 'lines+markers',
      name: `Pavement Temperature selected model 4`,
      marker: { color: 'black' },
    },
    {
      x: graphData.time,
      y: graphData.pavementTemperatures[4].data,
      type: 'scatter',
      mode: 'lines+markers',
      name: `Pavement Temperature selected model 5`,
      marker: { color: 'aquamarine' },
    },
    {
      x: graphData.time,
      y: graphData.pavementTemperatures[5].data,
      type: 'scatter',
      mode: 'lines+markers',
      name: `Pavement Temperature selected model 6`,
      marker: { color: 'cadetblue' },
    },
    {
      x: graphData.time,
      y: graphData.pavementTemperatures[6].data,
      type: 'scatter',
      mode: 'lines+markers',
      name: `Pavement Temperature selected model 7`,
      marker: { color: 'magenta' },
    },
    {
      x: graphData.time,
      y: graphData.airTemperatures,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Air Temperature',
      marker: { color: 'red' },
    },
  ]}
  layout={{ width: '10000%', height: 450, title: 'Temperature Variation',xaxis: {
    title: {
      text: 'Time',
    },
  },
  yaxis: {
    title: {
      text: 'Temperature (°C)',
    },
  }, }}
/>
        </div>
      )}
    </div>
  );
};

export default State;
