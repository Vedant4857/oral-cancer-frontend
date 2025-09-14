import React from "react";
import { MapPin, Phone } from "lucide-react"; // install with: npm install lucide-react

export default function Hospitals() {
  const hospitals = [
    {
      name: "Wockhardt Hospital Rajkot",
      address: "Kalawad Road, Rajkot, Gujarat 360007",
      contact: "0281-6199999",
      maps: "https://maps.google.com/?q=Wockhardt+Hospital+Rajkot",
    },
    {
      name: "Sterling Hospital Rajkot",
      address: "150 Feet Ring Road, Rajkot, Gujarat 360007",
      contact: "0281-6691000",
      maps: "https://maps.google.com/?q=Sterling+Hospital+Rajkot",
    },
    {
      name: "Civil Hospital Rajkot",
      address: "Jubilee Garden, Rajkot, Gujarat 360001",
      contact: "0281-2459111",
      maps: "https://maps.google.com/?q=Civil+Hospital+Rajkot",
    },
    {
      name: "Gokul Superspeciality Hospital",
      address: "150 Feet Ring Road, Rajkot, Gujarat 360007",
      contact: "0281-6198500",
      maps: "https://maps.google.com/?q=Gokul+Superspeciality+Hospital+Rajkot",
    },
    {
      name: "Unique Hospital Rajkot",
      address: "Kalawad Road, Rajkot, Gujarat 360005",
      contact: "0281-6193333",
      maps: "https://maps.google.com/?q=Unique+Hospital+Rajkot",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-indigo-700 mb-3 border-b pb-1">
        Nearby Hospitals (Rajkot)
      </h3>

      <ul className="space-y-3">
        {hospitals.map((h, i) => (
          <li
            key={i}
            className="p-4 bg-gray-50 rounded-lg border hover:shadow transition"
          >
            <div className="font-medium text-gray-800">{h.name}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <MapPin size={16} className="text-indigo-600" />
              <a
                href={h.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {h.address}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Phone size={16} className="text-indigo-600" />
              <a
                href={`tel:${h.contact}`}
                className="hover:underline text-indigo-700"
              >
                {h.contact}
              </a>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-gray-500 italic">
        *This is a sample list of hospitals in Rajkot. Please verify details
        before visiting.
      </p>
    </div>
  );
}
