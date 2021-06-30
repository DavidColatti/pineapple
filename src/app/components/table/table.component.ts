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
  filteredDeviceTableRows: Device[];
  searchInput: string;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.setupTable();
  }

  private setupTable(): void {
    this.deviceService.getAll().subscribe((data: DeviceTable) => {
      this.deviceTable = data;
      // assigning data rows to the filteredDeviceTableRows so we don't mutate
      // the original table data rows when filtering.
      this.filteredDeviceTableRows = data.rows;
    });
  }

  filterTable(): void {
    if (this.searchInput.length > 0) {
      const filteredTableRows = this.deviceTable.rows.filter((row) => {
        const concatenatedRowValues = Object.values(row).join('');
        return concatenatedRowValues
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });

      this.filteredDeviceTableRows = filteredTableRows;
    } else {
      this.filteredDeviceTableRows = this.deviceTable.rows;
    }
  }
}
