import { baggageUtils } from "@opentelemetry/core";
import { appendResourcePathToUrl } from "@opentelemetry/otlp-exporter-base";
import { LogRecord } from "../types";
import {
	OTLPCloudflareExporterBase,
	OTLPCloudflareExporterBaseConfig
} from "./OTLPCloudflareExporterBase";
import {
	createExportLogsServiceRequest,
	IExportLogsServiceRequest
} from "./utils";
const DEFAULT_COLLECTOR_RESOURCE_PATH = "v1/logs";

export interface OTLPJsonLogExporterConfig
	extends OTLPCloudflareExporterBaseConfig {}

export class OTLPJsonLogExporter extends OTLPCloudflareExporterBase<
	OTLPJsonLogExporterConfig,
	LogRecord,
	IExportLogsServiceRequest
> {
	contentType = "application/json";
	static fromEnv(env: Record<string, string>) {
		return new OTLPJsonLogExporter(OTLPCloudflareExporterBase.parseEnv(env, "LOGS"));
	}
	convert(logRecords: LogRecord[]): IExportLogsServiceRequest {
		return createExportLogsServiceRequest(logRecords, true);
	}
	getUrl(url: string): string {
		return appendResourcePathToUrl(url, DEFAULT_COLLECTOR_RESOURCE_PATH);
	}
}
