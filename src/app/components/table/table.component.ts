import { Component, OnInit } from '@angular/core';
import { DeviceTable } from 'src/app/models/device-table.model';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  deviceTable: DeviceTable;
  filteredDeviceTableData: Device[];
  searchInput: string;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.setupTable();
  }

  private setupTable(): void {
    this.deviceService.getAll().subscribe((data: DeviceTable) => {
      this.deviceTable = data;
      this.filteredDeviceTableData = data.rows;
    });
  }

  filterTable(): void {
    const filteredTableData = this.deviceTable.rows.filter((row) => {
      const concatenatedRowValues = Object.values(row).join('');
      return concatenatedRowValues
        .toLowerCase()
        .includes(this.searchInput.toLowerCase());
    });

    this.filteredDeviceTableData = filteredTableData;
  }
}
