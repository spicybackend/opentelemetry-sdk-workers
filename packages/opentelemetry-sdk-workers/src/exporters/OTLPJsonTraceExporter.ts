import { appendResourcePathToUrl } from "@opentelemetry/otlp-exporter-base";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import {
	createExportTraceServiceRequest,
	IExportTraceServiceRequest
} from "@opentelemetry/otlp-transformer";
import {
	OTLPCloudflareExporterBase,
	OTLPCloudflareExporterBaseConfig
} from "./OTLPCloudflareExporterBase";
import { baggageUtils } from "@opentelemetry/core";

const DEFAULT_COLLECTOR_RESOURCE_PATH = "v1/traces";

export interface OTLPJsonTraceExporterConfig
	extends OTLPCloudflareExporterBaseConfig {}
export class OTLPJsonTraceExporter extends OTLPCloudflareExporterBase<
	OTLPJsonTraceExporterConfig,
	ReadableSpan,
	IExportTraceServiceRequest
> {
	static fromEnv(env: Record<string, string>) {
		return new OTLPJsonTraceExporter(OTLPCloudflareExporterBase.parseEnv(env, "TRACES"));
	}
	getUrl(url: string): string {
		return appendResourcePathToUrl(url, DEFAULT_COLLECTOR_RESOURCE_PATH);
	}
	contentType = "application/json";
	convert(spans: ReadableSpan[]): IExportTraceServiceRequest {
		return createExportTraceServiceRequest(spans, true);
	}
}
