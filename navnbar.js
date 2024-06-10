import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

const { SubMenu } = Menu;

const states = {
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

const Navbar = () => {
  const stateMenu = (
    <Menu>
      {Object.keys(states).map((state, stateIndex) => (
        <Menu.Item key={`state-${stateIndex}`}>
          <Link to={`/state/${state}`}>{state}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Dropdown overlay={stateMenu} placement="bottomLeft">
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          State <DownOutlined />
        </a>
      </Dropdown>
    </Menu>
  );
};

export default Navbar;
