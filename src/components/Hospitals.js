import React from "react";

export default function Hospitals() {
  const hospitals = [
    {
      name: "Wockhardt Hospital Rajkot",
      address: "Kalawad Road, Rajkot, Gujarat 360007",
      contact: "0281-6199999",
      maps: "https://maps.google.com/?q=Wockhardt+Hospital+Rajkot"
    },
    {
      name: "Sterling Hospital Rajkot",
      address: "150 Feet Ring Road, Rajkot, Gujarat 360007",
      contact: "0281-6691000",
      maps: "https://maps.google.com/?q=Sterling+Hospital+Rajkot"
    },
    {
      name: "Civil Hospital Rajkot",
      address: "Jubilee Garden, Rajkot, Gujarat 360001",
      contact: "0281-2459111",
      maps: "https://maps.google.com/?q=Civil+Hospital+Rajkot"
    },
    {
      name: "Gokul Superspeciality Hospital",
      address: "150 Feet Ring Road, Rajkot, Gujarat 360007",
      contact: "0281-6198500",
      maps: "https://maps.google.com/?q=Gokul+Superspeciality+Hospital+Rajkot"
    },
    {
      name: "Unique Hospital Rajkot",
      address: "Kalawad Road, Rajkot, Gujarat 360005",
      contact: "0281-6193333",
      maps: "https://maps.google.com/?q=Unique+Hospital+Rajkot"
    }
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Nearby Hospitals (Rajkot)</h3>
      <ul className="space-y-3">
        {hospitals.map((h, i) => (
          <li key={i} className="p-3 bg-gray-50 rounded border">
            <div className="font-medium">{h.name}</div>
            <div className="text-sm text-gray-600">{h.address}</div>
            <div className="text-sm text-gray-500">
              ☎ <a href={`tel:${h.contact}`} className="text-blue-600 hover:underline">{h.contact}</a>
            </div>
            <a
              href={h.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline"
            >
              📍 View on Google Maps
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-gray-400">
        *This is a sample list of hospitals in Rajkot. Please verify details before visiting.
      </p>
    </div>
  );
}
